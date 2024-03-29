function cloneDeep(obj) {
  if (obj instanceof Date) {
    return new Date(obj);
  }
  let res = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value instanceof Object) { //Primitive checking if value is a primitive type
      res[key] = cloneDeep(value);
    }
    else {
      res[key] = value;
    }
  }
  return res;
}

const user = {
  name: "Alice",
  surname: "Young",
  dates: {
    birthDate: new Date(1995, 10, 28)
  },
  contact: {
    phone: '111-111-111',
    address: {
      city: "London",
    }
  }
};

const userCp = cloneDeep(user);

user.name = "John";
user.surname = "White";
user.dates.birthDate = new Date(1999, 11, 11);
user.contact.phone = '222-222-222';
user.contact.address.city = 'New York'

console.log(user);
/*
{ 
  name: 'John',
  surname: 'White',
  dates: {
    birthDate: Sat Dec 11 1999 00:00:00 GMT+0100 (czas środkowoeuropejski standardowy)
  },
  contact: { 
    phone: '222-222-222', 
    address: { 
      city: 'New York' 
    } 
  } 
}
*/
console.log(userCp);
/*
{ 
  name: 'Alice',
  surname: 'Young',
  dates: {
    birthDate: Tue Nov 28 1995 00:00:00 GMT+0100 (czas środkowoeuropejski standardowy)
  },
  contact: { 
    phone: '111-111-111', 
    address: { 
      city: 'London' 
    } 
  } 
} 
*/