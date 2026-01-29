"use client";

import { useState } from "react";

import { ContactList } from "~/app/contacts/_components/ContactList";
import { CreateContactForm } from "~/app/contacts/_components/CreateContactForm";

export function ContactsPageContent() {
  const [refreshKey, setRefreshKey] = useState(0);

  function handleContactCreated() {
    setRefreshKey((previousKey) => previousKey + 1);
  }

  return (
    <>
      <CreateContactForm onContactCreated={handleContactCreated} />
      <ContactList refreshKey={refreshKey} />
    </>
  );
}
