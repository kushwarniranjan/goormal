
'use client'

import { useToast } from "@/hooks/use-toast"
import { useState, useTransition } from "react"

import { AlertDialog, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog"
import { AlertDialogCancel, AlertDialogDescription, AlertDialogTrigger } from "@radix-ui/react-alert-dialog"
import { Button } from "../ui/button"


const DeleteDialog = ({ id, action }: {
    id: string,
    action: (id: string) => Promise<{ success: boolean, message: string }>

}) => {
    const [open, setOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const { toast } = useToast()
    const handleDeleteClick = () => {
        startTransition(async () => {
            const res = await action(id)
            if (!res.success) {
                toast({
                    variant: 'destructive',
                    description: res.message
                })
            } else {
                setOpen(false)
                toast({
                    description: res.message
                })

            }

        })
    }
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className="ml-2">
                    Delete
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent >
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure??</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <Button asChild variant='outline'>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </Button>
                    <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleDeleteClick}
                        disabled={isPending}
                    >
                        {isPending ? 'Deleting...' : 'Delete'}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteDialog