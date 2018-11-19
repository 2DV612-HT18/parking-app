const roles = [
  { id: 1, role: 'Admin' },
  { id: 2, role: 'User' },
  { id: 3, role: 'ParkingOwner' },
];

export const resolvers = {
  Query: {
    roleByName: (root, args, context, info) => {
      return getRoleName(args.role)
    },
  },
};

// Testing
function getRoleName(name) {
  for(let r of roles) {
    if (r.role == name) {
      return r
    }
  }
}
