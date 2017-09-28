import React, { Component } from 'react';
import {
  gql,
  graphql,
} from 'react-apollo';
import ChannelPreview from './ChannelPreview';
import NotFound from './NotFound';
import MessageList from './MessageList';

const ChannelDetails = ({ data: {loading, error, channel }, match }) => {
  if (loading) {
    // return <p>Loading...</p>;
    return <ChannelPreview channelId={match.params.channelId}/>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }
  if(channel === null){
    return <NotFound />
  }

  return (<div>
      <div className="channelName">
        {channel.name}
      </div>
      <MessageList messages={channel.messages}/>
    </div>);
}

export const channelDetailsQuery = gql`
query ChannelDetailsQuery($channelId : ID!) {
  channel(id: $channelId) {
    id
    name
    messages {
      id
      text
    }
  }
}
`;

export default (graphql(channelDetailsQuery, {
  options: (props) => ({
    variables: { channelId: props.match.params.channelId },
  }),
})(ChannelDetails));