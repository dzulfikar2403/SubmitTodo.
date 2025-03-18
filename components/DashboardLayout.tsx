import React from 'react'
import Sidebar from './Sidebar'
import { getListTypeByUsers } from '@/lib/query';
import { getUser, GetUser } from '@/lib/auth/helper';

const DashboardLayout = async ({children}:{children:React.ReactNode}) => {
  const listType = await getListTypeByUsers();
  const {username} = (await getUser()) as GetUser;

  return (
    <div className="w-full flex">
      <Sidebar listType={listType?.rows as any[]} username={username} />
      {children}
    </div>
  )
}

export default DashboardLayout