import React, { Component } from 'react';
import {
  gql,
  graphql,
} from 'react-apollo';

import AddChannel from './AddChannel';

const ChannelsList = ({ data: {loading, error, channels }}) => {
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return <div className="channelsList">
      <AddChannel />
      { channels.map( ch => 
        (<div key={ch.id} className="channel">{ch.name}</div>)
      )}
    </div>;
};

const channelsListQuery = gql`
query ChannelsListQuery {
  channels {
    id
    name
  }
}
`;

export default graphql(channelsListQuery)(ChannelsList);