import { Button, Menu, Text, rem } from '@mantine/core';
import { IconClock, IconChartBar, IconBuildingStore, IconMenu2, IconFolderOpen, IconLogout } from '@tabler/icons-react';
import classes from './NavbarSimple.module.css';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

interface NavbarProps {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

const data = [
  { link: '/timer', label: 'Timer', icon: IconClock },
  { link: '/store', label: 'Store', icon: IconBuildingStore },
  { link: '/statistics', label: 'Stats', icon: IconChartBar },
  { link: '/projects', label: 'Projects', icon: IconFolderOpen }
];

const footerData = [
  { link: '/settings', label: 'More', icon: IconMenu2 }
];

export function NavbarSimple({ active, setActive }: NavbarProps) {
  const navigate = useNavigate();

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        navigate(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  const footerLinks = footerData.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        navigate(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Text className={classes.header}>Paws</Text>
        {links}
      </div>

      <Menu width={200} shadow="md">
        <Menu.Target>
          <div className={classes.footer}>
            <a 
              className={classes.link}
              style={{ cursor: 'pointer' }}
            >
              <IconMenu2 className={classes.linkIcon} stroke={1.5} />
              <span>More</span>
            </a>
          </div>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            onClick={() => handleLogout()}
            leftSection={<IconLogout stroke={1.5} />}
          >
            <Text>Log out</Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </nav>
  );
}