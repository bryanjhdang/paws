import { useState } from 'react';
import { Text, Group } from '@mantine/core';
import { IconClock, IconPaw, IconChartBar, IconSettings, IconUser } from '@tabler/icons-react';
import classes from './NavbarSimple.module.css';
import { useNavigate } from 'react-router-dom';

const data = [
  { link: '/timer', label: 'Timer', icon: IconClock },
  { link: '/pet', label: 'Pet', icon: IconPaw },
  { link: '/statistics', label: 'Statistics', icon: IconChartBar }
];

export function NavbarSimple() {
  const [active, setActive] = useState('Billing');
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
        console.log(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          <Text>Tempify</Text>
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => {
          event.preventDefault()
          navigate('/settings')
        }}>
          <IconSettings className={classes.linkIcon} stroke={1.5} />
          <span>Settings</span>
        </a>
      </div>
    </nav>
  );
}