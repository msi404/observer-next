import { Card, CardContent } from '@/app/_components/ui/card';
import { Skeleton } from '@/app/_components/ui/skeleton';
import { Container } from '@/app/_components/container';
import { For } from '@/app/_components/for';

export const LoadingTable = () => {
  const arrayHeader = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }];

  const arrayBody = [
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
    { id: '10' },
    { id: '11' },
    { id: '12' }
  ];
  return (
    <Container>
      <Card className="p-4">
        <CardContent className="flex flex-col lg:flex-row gap-5 justify-between">
          <div className="lg:w-1/2 flex flex-col lg:flex-row gap-5">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-9 px-4 py-2 w-full lg:w-24" />
          </div>
        </CardContent>
        <Container>
          <div>
            <div>
              <div className='flex justify-between'>
                <For each={arrayHeader}>
                  {(item) => (
                    <div key={item.id}>
                      <Skeleton className="h-4 w-16" />
                    </div>
                  )}
                </For>
              </div>
            </div>
            <div>
              <For each={arrayBody}>
                {(item) => (
                  <div className='flex justify-between items-center gap-4' key={item.id}>
                    <For each={arrayHeader}>
                      {(item) => (
                        <div className='my-2' key={item.id}>
                          <Skeleton className="h-5 w-20" />
                        </div>
                      )}
                    </For>
                  </div>
                )}
              </For>
            </div>
          </div>
          <Skeleton className="w-full h-8 mt-12" />
        </Container>
      </Card>
    </Container>
  );
};
