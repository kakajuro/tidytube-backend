'use client'

import { ReactNode } from "react";
import { Provider } from 'jotai'

type LayoutProps = {children?: ReactNode}

export const Providers = ({ children }: LayoutProps) => {
  return (
    <Provider>
      {children}
    </Provider>
  )
}