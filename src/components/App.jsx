import React, { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

const retrievedInitialContacts = () => {
  const savedContacts = JSON.parse(localStorage.getItem('contacts'));

  if (savedContacts && savedContacts.length > 0) {
    return savedContacts;
  }

  console.log('Using default contacts');
  return [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];
};

export const App = () => {
  const [contacts, setContacts] = useState(retrievedInitialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {

    const duplicateContact = contacts.find(
      contact => contact.name === newContact.name
    );

    if (duplicateContact) {

      alert(`${newContact.name} is already in your contacts.`);
      return;
    }

    setContacts(prevContacts => {
      const updatedContacts = [...prevContacts, newContact];

      return updatedContacts;
    });
  };

  const deleteContact = id => {
    
    setContacts(prevContacts => {
      const updatedContacts = prevContacts.filter(contact => contact.id !== id);
      
      return updatedContacts;
    });
  };

  const filterContact = () => {
    
    const filterLowerCase = filter.toLowerCase();
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterLowerCase)
    );

    return filteredContacts;
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} contacts={contacts} />

      <h2>Contacts</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <ContactList
        filterContact={filterContact}
        deleteContact={deleteContact}
        contacts={contacts}
      />
    </div>
  );

};