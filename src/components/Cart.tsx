'use client'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet'
import { Separator } from './ui/separator'
import { ShoppingCart } from 'lucide-react';
import { formatPrice } from "@/lib/utils"
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import Image from 'next/image';

type Props = {}

const Cart = (props: Props) => {
  const itemCount = 0
  const fee = 1

  return (
    <Sheet>
      <SheetTrigger className='group -m-2 flex items-center p-2'>
        <ShoppingCart
          aria-hidden='true'
          className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
        />
        <span
          className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
          0
        </span>
      </SheetTrigger>

      <SheetContent
        className='flex w-full flex-col pr-0 sm:max-w-lg'
      >
        <SheetHeader
          className='space-y-2.5 pr-6'
        >
          <SheetTitle>Cart (0)</SheetTitle>
        </SheetHeader>
        {itemCount === 0 && (
          <p className='flex h-full flex-col items-center justify-center space-y-1'>
            <div className='relative mb-4 h-60 w-60 text-muted-foreground'>
              <Image
                src='/hippo-empty-cart.png'
                alt='Empty cart'
                fill
                aria-hidden='true'
              />
            </div>

            <div className='text-xl font-bold'>
              Your cart is empty
            </div>

            <SheetTrigger asChild>
              <Link
                href='/products'
                className={buttonVariants({
                  variant: 'link',
                  size: 'sm',
                  className: 'text-sm text-muted-foreground'
                })}
              >
                Add items to your cart
              </Link>
            </SheetTrigger>
          </p>
        )}

        {itemCount > 0 && (
          <>
            <div className='flex w-full flex-col pr-6'>
              {/* TODO: cart logic */}
              Cart items
            </div>

            <div className='space-y-4 pr-6'>
              <Separator />

              <div className='space-y-1.5 text-small'>
                <div className='flex'>
                  <div className='flex-1'>Shipping</div>
                  <div>Free</div>
                </div>

                <div className='flex'>
                  <div className='flex-1'>Transaction Fee</div>
                  <div>{formatPrice(fee)}</div>
                </div>

                <div className='flex'>
                  <div className='flex-1'>Total</div>
                  <div>{formatPrice(fee)}</div>
                </div>
              </div>

              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href='/cart'
                    className={buttonVariants({ className: 'w-full' })}
                  >
                    Continue to Checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default Cart