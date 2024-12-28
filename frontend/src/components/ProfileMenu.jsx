import React from 'react';
import { Menu, Avatar } from '@mantine/core';

const ProfileMenu = ({ user, logout }) => {
  return (
    <Menu>
      <Menu.Target>
        <Avatar src={user?.picture} alt="User image" radius="xl" />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item>Favourites</Menu.Item>
        <Menu.Item>Bookings</Menu.Item>
        <Menu.Item>Go back</Menu.Item>
        <Menu.Item
          onClick={() => {
            localStorage.clear();
            if (logout) {
              logout(); // Call logout function if provided
            } else {
              console.warn('Logout function not defined');
            }
          }}
          color="red"
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
