"use server";

import { wixClientServer } from "./wixClientServer";

export const updateUser = async (formData) => {
  const wixClient = await wixClientServer();

  const id = formData.get("id");
  const userName = formData.get("userName");
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");
  const phone = formData.get("phone");

  try {
    const response = await wixClient.members.updateMember(id, {
      contact: {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        phones: phone ? [phone] : undefined,
      },
      loginEmail: email || undefined,
      profile: {
        nickname: userName || undefined,
      },
    });

    console.log(response);
  } catch (err) {
    console.error(err);
  }
};
