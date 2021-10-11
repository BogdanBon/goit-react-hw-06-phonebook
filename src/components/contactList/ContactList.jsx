import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
// import { connect } from "react-redux";
import { useSelector } from 'react-redux';
import * as actions from '../../redux/actions';
import s from './ContactList.module.css';
import { getContacts, getFilter } from '../../redux/selector';

export default function ContactList() {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);

  const visibleList = () => {
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter),
    );
  };
  const dispatch = useDispatch();
  const deleteContact = value => dispatch(actions.deleteContacts(value));
  return (
    <div className={s.container}>
      <ul>
        {visibleList().map(contact => (
          <li key={contact.id} className={s.item}>
            <span>
              {contact.name}: {contact.number}
            </span>
            <button
              className={s.btn}
              type="submit"
              onClick={() => deleteContact(contact)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// const mapDispatchToProps = (dispatch) => ({
//   deleteContact: (value) => dispatch(actions.deleteContacts(value)),
// });

// export default connect(null, mapDispatchToProps)(ContactList);

ContactList.propTypes = {
  getVisibleContacts: PropTypes.func,
  deleteContact: PropTypes.func,
};
