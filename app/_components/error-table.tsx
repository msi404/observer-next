import { type FC } from 'react';
import { motion } from 'motion/react';
import { Container } from '@/app/_components/containers/container';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/app/_components/ui/card';
import { CloudAlert, RefreshCcw } from 'lucide-react';

export const ErrorTable: FC<{ retry: VoidFunction }> = ({ retry }) => {
  return (
    <Container>
      <Card className="p-4 h-96">
        <CardHeader className="flex justify-center items-center">
          <CardTitle className="text-3xl flex gap-3 justify-center items-center">
            <CloudAlert color="red" size="35px" />
            <span>خطأ</span>
          </CardTitle>
          <CardDescription>يبدو ان هناك خطأ في تحميل البيانات</CardDescription>
        </CardHeader>
        <CardContent className="text-primary flex justify-center items-center">
          <motion.button
            onClick={retry}
            whileHover={{
              scale: 1.1,
              transition: {
                damping: 0,
                ease: 'linear',
                duration: 0.2
              }
            }}
            className="bg-slate-200 p-4 mx-4 cursor-pointer rounded-full text-gray-500 hover:text-primary"
          >
            <RefreshCcw size='35px'/>
          </motion.button>
        </CardContent>
      </Card>
    </Container>
  );
};
