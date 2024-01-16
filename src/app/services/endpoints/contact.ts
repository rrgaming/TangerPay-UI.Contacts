import { contactsApi } from "../index";
import { AddContactModel, ContactModel } from "../models/contactModel";

const extendedApi = contactsApi.injectEndpoints({
  endpoints: (builder) => ({
    getContactById: builder.query<ContactModel, number>({
      query: (id) => `/contact/recordcontactdetails/${id}`,
    }),
    addContact: builder.mutation<number, AddContactModel>({
      query(body) {
        return {
          url: `/contact/recordcontactdetails`,
          method: "POST",
          body: body,
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const { useLazyGetContactByIdQuery, useAddContactMutation } = extendedApi;
