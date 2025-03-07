'use client';
import { type FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {selectUser} from '@/app/_lib/features/authSlice'
import {
  selectCurrentNotification,
  selectNotificationStatus,
  setNotification
} from '@/app/_lib/features/notificationsSlice';
import NextImage from 'next/image';
import { useMyNotificationQuery } from '@/app/_services/fetchApi';
import {useSwitchSeenNotificationMutation} from '@/app/_services/mutationApi'
import { ScrollArea, ScrollBar } from '@/app/_components/ui/scroll-area';
import { Badge } from '@/app/_components/ui/badge';
import { FetchCard } from '@/app/_components/fetch-card';
import { ErrorCard } from '@/app/_components/error-card';
import { SkeletonCard } from '@/app/_components/skeleton-card';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/app/_components/ui/card';
import { Bell } from 'lucide-react';
import { For } from '@/app/_components/utils/for';
import { Switch, Match } from '@/app/_components/utils/switch';
import { Retry } from '@/app/_components/custom/retry';
import { AddNotificationsForm } from '@/app/_components/forms/add-notification-form';
import Placeholder from '@/app/_assets/images/placeholder.png';

const Message: FC<{
  id: string;
  creator: string;
  title: string;
  content: string;
  img: string;
  createdAt: string;
}> = ({ creator, content, title, createdAt, img, id }) => {
  const dispatch = useDispatch();
  const [switchSeenNotification] = useSwitchSeenNotificationMutation()
  function checkURL(url: string) {
    return url?.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }
  const onMessageClick = async () => {
    dispatch(
      setNotification({
        image: img,
        sender: creator,
        date: createdAt,
        description: content,
        title: title,
        id: id
      } )
    );
   await switchSeenNotification(id)
  };
  var options = { weekday: 'short' };
  const date = `${new Date(createdAt).toLocaleDateString(
    'en-US',
    //@ts-ignore
    options
  )} - ${new Date(createdAt).toLocaleTimeString('en-US')}`;
  return (
    <Card
      className="h-44 w-full flex relative cursor-pointer"
      onClick={onMessageClick}
    >
      <Badge variant="destructive" className="absolute -top-2 right-0">
        اشعار
      </Badge>
      <CardHeader className="w-full">
        <div className="flex flex-col gap-2 justify-between w-full">
          <div className="flex gap-2">
            <div>
              <Switch>
                <Match when={checkURL(img)}>
                  <NextImage
                    blurDataURL={Placeholder.blurDataURL}
                    className="rounded-full h-12"
                    src={img}
                    width={50}
                    height={50}
                    alt="Sender Image"
                  />
                </Match>
                <Match when={!checkURL(img)}>
                  <NextImage
                    blurDataURL={Placeholder.blurDataURL}
                    className="rounded-full h-12"
                    src={Placeholder.src}
                    width={50}
                    height={50}
                    alt="Sender Image"
                  />
                </Match>
              </Switch>
              <div>
                <CardTitle className="text-primary text-xs my-2">{creator}</CardTitle>
                <h1 className="text-sm">{title}</h1>
              </div>
            </div>
            <div>
              <h1 className="text-gray-500 text-xs">{date}</h1>
            </div>
          </div>
          <CardDescription className="text-xs">
            <div>{content}</div>
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  );
};

const MessagesCoaster: FC<{ messages: any[] }> = ({ messages }) => {
  return (
    <ScrollArea className="w-full lg:w-1/2 border-l">
      <ScrollBar />
      <div className="w-full h-[calc(100vh-400px)] lg:h-[calc(100vh-150px)] p-3 space-y-4">
        <For each={messages}>
          {(item) => (
            <Message
              id={item.id}
              title={item.title}
              content={item.content}
              creator={item.actorName}
              img={item.img}
              createdAt={item.createdAt}
            />
          )}
        </For>
      </div>
    </ScrollArea>
  );
};

const EmptyComplaints = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full gap-4">
      <Bell size={150} />
      <div className="text-center space-y-2">
        <h1 className="font-semibold text-xl">انت لم تختر اي اشعار بعد</h1>
        <p className="text-sm text-gray-500">يرجى تحديد اشعار لعرضه</p>
      </div>
    </div>
  );
};

export const NotificationsWidget = () =>
{
  const user = useSelector(selectUser);
  const currentNotification = useSelector(selectCurrentNotification);
  const notificationStatus = useSelector( selectNotificationStatus );
  const electoralEntityId = (user?.electoralEntity as unknown as ElectoralEntity)?.id
  const electoralEntityIdQuery = electoralEntityId !== undefined ? `&ElectoralEntityId=${ electoralEntityId }` : '';
  const { data, isError, isFetching, isLoading, isSuccess, refetch } =
    useMyNotificationQuery(`PageNumber=1&PageSize=30${electoralEntityIdQuery}`, {pollingInterval: 10000, skipPollingIfUnfocused: true});
  useEffect( () =>
  {
    if ( !isLoading )
    {
      console.log(data);
    }
  }, [isLoading, isFetching, data])
  return (
    <Card className="p-4 flex flex-col lg:flex-row h-screen">
      <CardContent className="flex flex-col w-full lg:flex-row justify-between items-center">
        <Switch>
          <Match when={isError}>
            <ErrorCard retry={refetch} />
          </Match>
          <Match when={isLoading}>
            <SkeletonCard />
          </Match>
          <Match when={isFetching}>
            <FetchCard className="w-96 h-48 lg:h-96" />
          </Match>
          <Match when={isSuccess}>
            <MessagesCoaster messages={data?.items} />
          </Match>
        </Switch>
        <Switch>
          <Match when={!notificationStatus}>
            <div className="px-3 w-full">
              <Message
                id={currentNotification.id}
                img={currentNotification.date}
                title={currentNotification.title}
                content={currentNotification.description}
                createdAt={currentNotification.date}
                creator={currentNotification.sender}
              />
            </div>
          </Match>
          <Match when={notificationStatus}>
            <EmptyComplaints />
          </Match>
        </Switch>
      </CardContent>
      <CardHeader>
			  <div className="flex items-center justify-center">
			  <Retry refetch={refetch} />
          <AddNotificationsForm />
        </div>
      </CardHeader>
    </Card>
  );
};
