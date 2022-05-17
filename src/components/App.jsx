import React from 'react';
import ContactForm from './form/contactForm';
import Filter from './filter/filter';
import ContactList from './contactList/contactList';
import { nanoid } from 'nanoid';

class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    const contactsName = this.state.contacts.map(({ name }) =>
      name.toLowerCase()
    );

    contactsName.includes(contact.name.toLowerCase())
      ? alert(`${contact.name} is already in contacts.`)
      : this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
  };

  filterChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  getFilterChange = () => {
    const { filter, contacts } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(normalizedFilter);
    });
  };

  deleteContact = contactId => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== contactId),
      };
    });
  };

  //Жизненный циклы компонента 
  componentDidMount() {
    console.log('// при первой загрузки')
  };

  componentDidUpdate(prevProps, prevState) {
    console.log('// каждый раз при изменения компонента');
    console.log(prevState);
    console.log(this.state);
  }

  render() {
    const { filter } = this.state;
    console.log('// render');

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.filterChange} />
        <ContactList
          visibleFilter={this.getFilterChange()}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
