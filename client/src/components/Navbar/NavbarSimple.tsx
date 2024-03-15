import { Text, Group } from '@mantine/core';
import { IconClock, IconPaw, IconChartBar, IconUsers, IconSettings, IconUser } from '@tabler/icons-react';
import classes from './NavbarSimple.module.css';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
}

const data = [
  { link: '/timer', label: 'Timer', icon: IconClock },
  { link: '/pet', label: 'Pet', icon: IconPaw },
  { link: '/statistics', label: 'Statistics', icon: IconChartBar },
  { link: '/friends', label: 'Friends', icon: IconUsers }
];

const footerData = [
  { link: '/profile', label: 'Profile', icon: IconUser },
  { link: '/settings', label: 'Settings', icon: IconSettings }
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

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="center">
          <Text>Tempify</Text>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        {footerLinks}
      </div>
    </nav>
  );
}