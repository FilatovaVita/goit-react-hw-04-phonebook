import { useState, useEffect } from 'react';
import { ContactForm } from '../ContactForm/ContactForm';
import { ContactList } from '../ContactList/ContactList';
import { Filter } from '../Filter/Filter';
import {
  PhonebookContainer,
  HeaderTitel,
  SecondTitel,
  DefoltMassege,
} from './App.styled';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
      const storageContact = JSON.parse(localStorage.getItem('contact'));
      if (storageContact) {
        return (storageContact ?? [
          { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
          { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
          { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
          { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
        ]);
      }
    },
  );
  const [filter, setFilter] = useState('');


  useEffect(() => {
    window.localStorage.setItem('contact', JSON.stringify(contacts));
  }, [contacts]);


  const onFormSubmit = ({ id, name, number }) => {
    const contact = { id, name, number };
    const nameInContacts = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );
    if (nameInContacts) {
      alert(`${name} is already in contacts`);
      return;
    }
    return setContacts(prevState => [contact, ...prevState]);
  };

  const onFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const onDelete = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };


  const onFilterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()),
  );


  return (
    <PhonebookContainer>
      <HeaderTitel>Phonebook</HeaderTitel>
      <ContactForm onSubmit={onFormSubmit} />
      {contacts.length ? (
        <div>
          <SecondTitel>Contacts</SecondTitel>
          <Filter onFilter={onFilter} filter={filter} />
        </div>
      ) : (
        <DefoltMassege>
          You dont have contacts! Please, field this Contact Form!
        </DefoltMassege>
      )}

      <ContactList
        onDelete={onDelete}
        filterContacts={onFilterContacts}
      />
    </PhonebookContainer>
  );
};




