import { FakeDb } from '#utils/fakeDb';
import usersData from '#data/fixtures/users.json';
import rolesData from '#data/fixtures/roles.json';
import categoriesData from '#data/fixtures/categories.json';
import itemsData from '#data/fixtures/items.json';
import itemChildrenData from '#data/fixtures/itemChildren.json';
import settingsData from '#data/fixtures/settings.json';

let instance: FakeDb | null = null;

export const connection = (): FakeDb => {
  instance ??= new FakeDb().loadAll({
    users: usersData,
    roles: rolesData,
    categories: categoriesData,
    items: itemsData,
    itemChildren: itemChildrenData,
    settings: settingsData,
  });

  return instance;
};

export const disconnection = (): void => {
  instance = null;
};
