import { PubSub, withFilter } from 'graphql-subscriptions';

const channels = [{
    id: 1,
    name: 'soccer',
    messages: [{
      id: 2,
      text: 'baseball is life',
    }]
  }
];

let nextId = 3;

const pubsub = new PubSub();

export const resolvers = {
  Query: {
    channels: () => {
      return channels;
    },
    channel: (root, { id }) => {
      console.log(channels);
      console.log(id);
      return channels.find(channel => channel.id === Number.parseInt(id));
    },
  },
  Mutation: {
    addChannel: (root, args) => {
      console.log('addChannel', args);
      const newChannel = { id: nextId++, name: args.name, messages:[] };
      channels.push(newChannel);
      return newChannel;
    },
    addMessage: (root, { message }) => {
      console.log('addMessage', message);
      const channel = channels.find(channel => channel.id === Number.parseInt(message.channelId));
      if(!channel)
        throw new Error("Channel does not exist");
  
      const newMessage = { id: String(nextId++), text: message.text };
      channel.messages.push(newMessage);

      pubsub.publish('messageAdded', { messageAdded: newMessage, channelId: message.channelId });

      return newMessage;
    },
  },
  Subscription: {
    messageAdded: {
      subscribe: withFilter(
        () => pubsub.asyncIterator('messageAdded'),
        (payload, variables) => {
          console.log('subscribe messageAdded: filter', payload, variables);
          return payload.channelId === variables.channelId;
        }
      )
    }
  },
};