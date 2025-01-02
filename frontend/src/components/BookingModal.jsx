import React, { useState, useContext } from 'react';
import { Modal } from '@mantine/core'; // Ensure Mantine is installed
import { DatePicker } from '@mantine/dates'; // Ensure Mantine DatePicker is installed
import { useMutation } from '@tanstack/react-query';
import { UserDetailContext } from "../context/UserDetailContext";

function BookingModal({ opened, setOpened,email, propertyId }) {
  const [value, setValue] = useState(null); // Corrected `useState` initialization
  const { useDetails: { token } } = useContext(UserDetailContext); // Destructure `useDetails` to get `token`


  const handleClose = () => {
    setOpened(false); // Close the modal when triggered
  };

  const [mutate, isLoading] = useMutation({
    mutationFn: () => bookvisit(value, propertyId, email, token),
  });

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={title || 'Select your date to visit'}
      centered
    >
      <div className="flex flex-col items-center gap-4">
        <DatePicker
          placeholder="Pick a date"
          label="Select Date"
          required
          minDate={new Date()} // Disable past dates
          onChange={setValue} // Corrected prop `onChange`
        />
        <button
          disabled={!value}
          onClick={() => mutate()}
          className="btn-primary px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Book Visit
        </button>
      </div>
    </Modal>
  );
}

export default BookingModal;
