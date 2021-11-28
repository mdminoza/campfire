import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Layout,
  Modal,
  Button,
  Result,
  Row,
  Col,
  Spin,
  Empty,
  Divider,
  Grid,
} from 'antd';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';

import { useCampfireAction } from '../../../hooks/campfire';
import { useUserState } from '../../../hooks/user';
import { useMediaStreamAction } from '../../../hooks/mediaStream';
import { useMemberAction } from '../../../hooks/member';
import { useSocketAction } from '../../../hooks/socket';
import { useTurnAction } from '../../../hooks/turn';

import { Loader } from '../../atoms/Loader';

const Container = styled(Layout)`
  &&& {
    min-height: 100vh;
  }
`;

const TestPage = (): React.ReactElement => {
  const {
    fetchCampfire,
    fetchCampfireMembers,
    deleteCampfire,
    updateOwnedCampfireActiveStatus,
  } = useCampfireAction();
  const {
    useSocketState,
    leaveCampfire,
    joinCampfire,
    raiseHand,
    endCampfire,
    setUserMenu,
    setUserEmoji,
    onMuteAll,
    setOnMute,
    kickMember,
    disableMic,
    testJoin,
    // getLatestStreams,
  } = useSocketAction();
  const {
    getLocalStream,
    useMediaStreamState,
    connectWithMyPeer,
  } = useMediaStreamAction();
  const { addMember, updateMemberActiveStatus } = useMemberAction();
  const { getTurnCredentials } = useTurnAction();

  const { currentUser, isLoading: isLoadingCurrentUser } = useUserState();
  const { socketId } = useSocketState;
  const navigate = useNavigate();
  const { id: campfireIdParam } = useParams();

  const {
    localStreamError,
    localStream,
    myPeerId,
    adminStreams,
    audienceStreams,
    isMediaSupported,
    setTurnServers,
  } = useMediaStreamState;

  // const {
  //   mutate: updateCampfireActiveStatusMutation,
  //   isLoading: loadingUpdateCampfireActiveStatus,
  //   // isSuccess: isCampfireAdded,
  // } = useMutation(
  //   (values: {
  //     cid: string;
  //     active: boolean;
  //     peerId: string;
  //     socketId: string;
  //   }) => updaxteOwnedCampfireActiveStatus(values),
  // );

  // const {
  //   mutate: updateMemberActiveStatusMutation,
  //   isLoading: loadingUpdateMemberActiveStatus,
  //   // isSuccess: isMemberUpcomingAdded,
  // } = useMutation((values: { uid: string; id: string }) =>
  //   updateMemberActiveStatus(values),
  // );

  const {
    refetch: refetchCampfire,
    data: campfire,
    isFetching: isFetchingCampfireLoading,
    error: fetchingCampfireError,
  } = useQuery(
    ['campfire', campfireIdParam],
    () => fetchCampfire(campfireIdParam),
    {
      onSuccess: (res) => {
        if (res && currentUser) {
          if (currentUser?.id === res?.creator?.uid) {
            testJoin(currentUser?.id, campfireIdParam, myPeerId, true);
            // updateCampfireActiveStatusMutation({
            //   cid: campfireIdParam,
            //   active: true,
            //   peerId: myPeerId,
            //   socketId,
            // });
          } else {
            testJoin(currentUser?.id, campfireIdParam, myPeerId, false);
            // updateMemberActiveStatusMutation({
            //   uid: currentUser?.id,
            //   id: campfireIdParam,
            // });
          }
        }
        console.log(res, 'res campfire');
      },
      onError: () => {
        // ErrorModal(
        //   'Sorry, campfire is not available at the moment or does not exist.',
        //   () => {
        //     navigate(`/campfires`);
        //   },
        // );
      },
      enabled: false,
    },
  );

  const {
    refetch: refetchTurnCredentials,
    data: turnCredentials,
    isLoading: isFetchingTurnCredentialsLoading,
    error: fetchingTurnError,
  } = useQuery(['turn-credentials'], () => getTurnCredentials(), {
    onSuccess: (res) => {
      setTurnServers(res.iceServers);
    },
    //   onError: (err: any) => {
    //     console.log(err, 'err fetching campfire member');
    //   },
    enabled: false,
  });

  useEffect(() => {
    if (!isFetchingTurnCredentialsLoading && turnCredentials) {
      getLocalStream();
      connectWithMyPeer();
    }
  }, [isFetchingTurnCredentialsLoading, turnCredentials]);

  useEffect(() => {
    if (myPeerId) {
      refetchCampfire();
    }
  }, [myPeerId]);

  useEffect(() => {
    refetchTurnCredentials();

    // return () => {
    //   leaveCampfire(currentUser?.id, campfireIdParam);
    // };
  }, []);

  // STYLES
  const loaderStyle = {
    fontSize: 16,
    color: '#424242',
    marginLeft: 32,
    marginRight: 20,
  };

  const mainLoader = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1000,
    backgroundColor: '#000000d1',
  };
  // END STYLES

  if (
    isLoadingCurrentUser ||
    isFetchingCampfireLoading ||
    // loadingUpdateCampfireActiveStatus ||
    // loadingUpdateMemberActiveStatus ||
    isFetchingTurnCredentialsLoading
  ) {
    return <Loader style={mainLoader} />;
  }

  return <Container>Hello world</Container>;
};
export default TestPage;
