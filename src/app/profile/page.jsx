import UpdateButton from "@/componetns/UpdateButton";
import { useWixClient } from "@/hooks/useWixClient";
import { updateUser } from "@/lib/actions";
import { wixClientServer } from "@/lib/wixClientServer";
import { members } from "@wix/members";
import React from "react";

const ProfilePage = async () => {
  const wixClient = await wixClientServer();

  const user = await wixClient.members.getCurrentMember({
    fieldsets: [members.Set.FULL],
  });

  if (!user?.member?.contactId) {
    return <div>Not logged in1</div>;
  }

  console.log(user);

  return (
    <div className=" w-full md:h-[calc(100vh-80px)] flex flex-col items-center md:flex-row gap-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-52">
      <div className="w-full md:w-1/2">
        <h1 className="text-2xl">Profile</h1>
        <form action={updateUser} className="mt-6 flex flex-col gap-4">
          <input type="text" hidden name="id" value={user?.member?.contactId} />
          <div className="flex flex-col gap-2">
            <label className="text-sm">User Name</label>
            <input
              type="text"
              name="userName"
              placeholder={user?.member?.profile?.nickname || "jhon"}
              className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm">First Name</label>
            <input
              type="text"
              name="firstName"
              placeholder={user?.member?.contact?.firstName || "Jhon"}
              className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm">Last Name</label>
            <input
              type="text"
              name="lastName"
              placeholder={user?.member?.contact?.lastName || "Doe"}
              className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm">Phone</label>
            <input
              type="text"
              name="phone"
              placeholder={
                (user?.member?.contact?.phones &&
                  user?.member?.contact?.phones[0]) ||
                "+8801911209322"
              }
              className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm">E-mail</label>
            <input
              type="text"
              name="email"
              placeholder={user?.member?.loginEmail || "jhon@gmail.com"}
              className="ring-1 ring-gray-300 rounded-md p-2 max-w-96"
            />
          </div>

          <UpdateButton />
        </form>
      </div>
      <div className="w-full md:w-1/2">Orders</div>
    </div>
  );
};

export default ProfilePage;
