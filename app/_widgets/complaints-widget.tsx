'use client';
import { type FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '@/app/_lib/features/authSlice';
import {
  selectCurrentMessage,
  selectMessageStatus,
  setMessage
} from '@/app/_lib/features/complaintsSlice';
import NextImage from 'next/image';
import { useComplaintsQuery } from '@/app/_services/fetchApi';
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
import { MessageSquareX } from 'lucide-react';
import { For } from '@/app/_components/utils/for';
import { Switch, Match } from '@/app/_components/utils/switch';
import { Retry } from '@/app/_components/custom/retry';
import Placeholder from '@/app/_assets/images/placeholder.png';

const Message: FC<{
  creator: string;
  title: string;
  content: string;
  img: string;
  createdAt: string;
}> = ({ creator, content, title, createdAt, img }) => {
  const dispatch = useDispatch();

  function checkURL(url: string) {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  }
  const onMessageClick = () => {
    dispatch(
      setMessage({
        image: img,
        sender: creator,
        date: createdAt,
        description: content,
        title: title
      })
    );
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
        شكوى
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
                <CardTitle className="text-primary">{creator}</CardTitle>
                <h1 className="text-sm">{title}</h1>
              </div>
            </div>
            <div>
              <h1 className="text-gray-500 text-xs">{date}</h1>
            </div>
          </div>
          <CardDescription className="text-xs">
            <div className="">{content}</div>
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
              title={item.title}
              content={item.content}
              creator={item.creator.name}
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
      <MessageSquareX size={150} />
      <div className="text-center space-y-2">
        <h1 className="font-semibold text-xl">انت لم تختر اي شكوى بعد</h1>
        <p className="text-sm text-gray-500">يرجى تحديد شكوى لعرضها</p>
      </div>
    </div>
  );
};

export const ComplaintsWidget = () => {
  const currentMessage = useSelector(selectCurrentMessage);
  const messageStatus = useSelector( selectMessageStatus );
  const user = useSelector(selectUser);
  const electoralEntityId = (user?.electoralEntity as unknown as ElectoralEntity)?.id
  const electoralEntityIdQuery = electoralEntityId !== undefined ? `&CreatorElectoralEntityId=${electoralEntityId}` : '';
  const { data, isError, isFetching, isLoading, isSuccess, refetch } =
    useComplaintsQuery(electoralEntityIdQuery);
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
          <Match when={!messageStatus}>
            <div className="px-3 w-full">
              <Message
                img={currentMessage.date}
                title={currentMessage.title}
                content={currentMessage.description}
                createdAt={currentMessage.date}
                creator={currentMessage.sender}
              />
            </div>
          </Match>
          <Match when={messageStatus}>
            <EmptyComplaints />
          </Match>
        </Switch>
      </CardContent>
      <CardHeader className="flex items-center">
        <Retry refetch={refetch} />
      </CardHeader>
    </Card>
  );
};
