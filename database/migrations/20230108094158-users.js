module.exports = {
  async up(db, client) {
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        await db
          .collection('users')
          .updateMany(
            {},
            { $rename: { name: 'fullName' }, $set: { blacklisted: true } }
          );
      });
    } finally {
      await session.endSession();
    }
  },

  async down(db, client) {
    const session = client.startSession();
    try {
      await session.withTransaction(async () => {
        await db
          .collection('users')
          .updateMany(
            {},
            { $rename: { fullName: 'name' }, $set: { blacklisted: false } }
          );
      });
    } finally {
      await session.endSession();
    }
  },
};
