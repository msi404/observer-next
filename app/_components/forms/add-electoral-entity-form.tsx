'use client';
// External libraries
import { motion } from 'motion/react';
import { PenSquare } from 'lucide-react';

// Hooks
import {useAddElectoralEntity} from '@/app/_hooks/actions/use-add-electoral-entity'
// UI Components
import { DialogClose, DialogFooter } from '@/app/_components/ui/dialog';
import { Button } from '@/app/_components/ui/button';
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
} from '@/app/_components/ui/form';
import { Separator } from '@/app/_components/ui/separator';
import {Input} from '@/app/_components/ui/input'

// Shared Components
import { BasicDialog } from '@/app/_components/custom/basic-dialog';
import { Spinner } from '@/app/_components/spinner';
// Utils
import { cn } from '@/app/_lib/utils';
export const AddElectoralEntityForm = () => {
  const {
	  openAdd,
	  setOpenAdd,
	  form,
	  onSubmit,
    isLoadingElectoralEntity,
  } = useAddElectoralEntity();

  return (
      <BasicDialog
        open={openAdd}
        onOpenChange={setOpenAdd}
        button={
          <motion.button
            whileHover={{
              scale: 1.1,
              transition: { damping: 0, ease: 'linear', duration: 0.2 }
            }}
            className="bg-slate-200 p-4 cursor-pointer rounded-full text-gray-500 hover:text-primary"
          >
            <PenSquare size="25px" />
          </motion.button>
        }
        title="اضافة كيان سياسي"
        description="ادخل المعطيات الاتية لاضافة عنصر"
      >
        <Form {...form}>
          <form className="grid gap-5" onSubmit={form.handleSubmit(onSubmit)}>
            {/* Form Fields */}
          <div className="grid gap-4">
          <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم الكيان السياسي</FormLabel>
                    <FormControl>
                      <Input
                        className={cn(
                          form.formState.errors.name &&
                            'border-destructive focus-visible:border-destructive focus-visible:ring-destructive placeholder:text-destructive'
                        )}
                        disabled={isLoadingElectoralEntity}
                        placeholder="اسم الكيان السياسي "
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
            />
            </div>

            {/* Separator */}
            <div className="relative">
              <Separator className="absolute bottom-1/4 left-1/2 right-1/2 rtl:translate-x-1/2 ltr:-translate-x-1/2 w-screen" />
            </div>

            {/* Form Actions */}
            <DialogFooter>
              <div className="flex justify-between w-full">
                <Button type="submit" disabled={isLoadingElectoralEntity}>
                  اضافة
                  {isLoadingElectoralEntity && (
                    <div className=" scale-125">
                      <Spinner />
                    </div>
                  )}
                </Button>
                <DialogClose asChild aria-label="Close">
                  <Button
                    variant="outline"
                    disabled={isLoadingElectoralEntity}
                  >
                    الغاء
                  </Button>
                </DialogClose>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </BasicDialog>
    )
};
