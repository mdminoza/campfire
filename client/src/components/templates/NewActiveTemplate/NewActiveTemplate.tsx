import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Modal, Button, Result } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useQuery, useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
// import { isMobile } from 'react-device-detect';
import styled from 'styled-components';

import { TitleContent } from '../../molecules/TitleContent';
import { SpeakersArea } from '../../organisms/SpeakersArea';
import { CampfireFooter1 } from '../../organisms/CampfireFooter1';
import { MembersList } from '../../organisms/MembersList';
import { ActiveResult } from '../../atoms/ActiveResult';
import { Loader } from '../../atoms/Loader';

import { ErrorModal } from '../../HOCs/ErrorModal';
import { ToastMessage } from '../../HOCs/ToastMessage';
import { AntdMessage } from '../../HOCs/AntdMessage';
import { useSocketAction } from '../../../hooks/socket';
import { useMediaStreamAction } from '../../../hooks/mediaStream';
import { useCampfireAction } from '../../../hooks/campfire';
import { useMemberAction } from '../../../hooks/member';
import { useUserState } from '../../../hooks/user';
import { useTurnAction } from '../../../hooks/turn';
import { MemberItemParams } from '../../molecules/MemberItem/types';

const ActiveSpeakersWrapper = styled.div`
  &&& {
    margin: -70px 0 24px;
    z-index: 1;
  }
`;

const AudienceWrapper = styled.div`
  &&& {
    margin: 0 40px 150px;
    @media (max-width: 500px) {
      margin: 0 0 100px;
    }
  }
`;

const NotSupportedContainer = styled.div`
  &&& {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
`;

const NewActiveTemplate = (): React.ReactElement => {
  const [activeUser, setActiveUser] = useState<
    { name: string; profileUrl: string; uid: string } | undefined
  >(undefined);
  const [selectedId, setSelectedId] = useState<string>('');
  const [isRaising, setHandRaised] = useState(false);
  const [isEndCampfireModal, setEndCampfireModal] = useState(false);
  const [isKickAllModal, setKickAllModal] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const {
    useSocketState,
    leaveCampfire,
    joinCampfire,
    raiseHand,
    endCampfire,
    setUserMenu,
    setUserEmoji,
    onMuteAll,
  } = useSocketAction();
  const {
    getLocalStream,
    useMediaStreamState,
    connectWithMyPeer,
  } = useMediaStreamAction();
  const {
    fetchCampfire,
    fetchCampfireMembers,
    deleteCampfire,
  } = useCampfireAction();
  const {
    fetchMember,
    // updateMemberStatus,
    deleteMember,
    deleteMembers,
  } = useMemberAction();
  const { getTurnCredentials } = useTurnAction();

  const { currentUser, isLoading: isLoadingCurrentUser } = useUserState();
  const navigate = useNavigate();
  const { id: campfireIdParam } = useParams();

  // WEBRTCS & SOCKETS
  const {
    localUser,
    setLocalUser,
    isCampfireEnded,
    muteAll,
    setMuteAll,
  } = useSocketState;
  const {
    localStreamError,
    localStream,
    myPeerId,
    adminStreams,
    audienceStreams,
    isMediaSupported,
    setTurnServers,
  } = useMediaStreamState;

  const {
    refetch: refetchCampfire,
    data: campfire,
    isFetching: isFetchingCampfireLoading,
    error: fetchingCampfireError,
  } = useQuery(
    ['campfire', campfireIdParam],
    () => fetchCampfire(campfireIdParam),
    {
      onError: () => {
        ErrorModal(
          'Sorry, campfire is not available at the moment or does not exist.',
          () => {
            navigate(`/campfires`);
          },
        );
      },
      enabled: false,
    },
  );

  const {
    refetch: refetchCampfireMember,
    data: campfireMember,
    isLoading: isFetchingCampfireMemberLoading,
  } = useQuery(
    ['campfire-member', campfireIdParam, activeUser?.uid],
    () => fetchMember({ uid: activeUser?.uid || '', id: campfireIdParam }),
    {
      onSuccess: (res) => {
        if (!res) {
          navigate(`/campfires`);
        }
      },
      onError: () => {
        navigate(`/campfires`);
      },
      enabled: false,
    },
  );

  const {
    refetch: refetchTurnCredentials,
    // data: turnCredentials,
    isLoading: isFetchingTurnCredentialsLoading,
    error: fetchingTurnError,
  } = useQuery(['turn-credentials'], () => getTurnCredentials(), {
    onSuccess: (res) => {
      setTurnServers(res.iceServers);
      getLocalStream();
      connectWithMyPeer();
    },
    //   onError: (err: any) => {
    //     console.log(err, 'err fetching campfire member');
    //   },
    enabled: false,
  });

  const {
    // refetch: refetchCampfireMembers,
    // data: campfireMembers,
    isLoading: isFetchingCampfireMembersLoading,
  } = useQuery(
    ['campfire-members', campfireIdParam],
    () => fetchCampfireMembers(campfireIdParam),
    // {
    //   onSuccess: (res) => {
    //     console.log(res, 'active campfire members');
    //   },
    //   onError: (err: any) => {
    //     console.log(err, 'err fetching campfire member');
    //   },
    // },
  );

  const {
    mutate: endCampfireMutation,
    isLoading: endCampfireLoading,
    isSuccess: endCampfireSuccess,
  } = useMutation((id: string) => deleteCampfire(id));

  const {
    mutate: kickMemberMutation,
    isLoading: kickMemberLoading,
    isSuccess: kickMemberSuccess,
  } = useMutation((params: { uid: string; id: string }) =>
    deleteMember(params),
  );

  const handleClickMember = (id: string) => {
    if (
      (activeUser?.uid === campfire?.creator?.uid &&
        id !== campfire?.creator?.uid) ||
      (localUser &&
        localUser.isModerator &&
        id !== campfire?.creator?.uid &&
        id !== localUser?.userId)
    ) {
      setSelectedId(id);
    }
  };

  const {
    // mutate: kickAllMembersMutation,
    isLoading: kickAllMembersLoading,
    // isSuccess: kickAllMembersSuccess,
  } = useMutation(
    (params: { uids: String[]; id: string }) => deleteMembers(params),
    {
      onSuccess: () => {
        setKickAllModal(false);
        AntdMessage('info', 'Succesfully kicked all audience.');
      },
    },
  );

  const handleClickRaiseHand = (userId: string) => {
    console.log(userId, 'user id raised hand');
    setHandRaised((value) => !value);
  };

  const handleOnClickEmoji = (
    selectedUserId: string,
    type: 'wink' | 'smile' | 'sweat' | 'cool',
  ) => {
    const emojiDetails = {
      emoji: type,
      emojiId: selectedUserId + Math.random().toString(36).substring(2),
    };
    setLocalUser({
      ...localUser,
      ...emojiDetails,
    });
    setUserEmoji(
      selectedUserId,
      campfireIdParam,
      emojiDetails,
      !localUser.isSpeaker,
    );
  };

  const onClickMic = (muted: boolean) => {
    setIsMuted(!isMuted);
    setMuteAll(null);
    localStream.getAudioTracks()[0].enabled = !muted;
  };

  const handleOnClickProfileMenu = (key: string) => {
    if (key === 'leaveCampfire') {
      navigate('/campfires');
    }
    if (key === 'endCampfire') {
      setEndCampfireModal(true);
    }
    if (key === 'kickAll') {
      setKickAllModal(true);
    }
    if (key === 'muteAll') {
      onMuteAll(activeUser?.uid || '', campfireIdParam, true);
    }
    if (key === 'unmuteAll') {
      onMuteAll(activeUser?.uid || '', campfireIdParam, false);
    }
    console.log(key, 'key');
  };

  const handleEndCampfire = useCallback(
    (id: string) => {
      endCampfireMutation(id, {
        onSuccess: (res: any) => {
          endCampfire(res.id);
          navigate('/campfires');
        },
      });
    },
    [endCampfire, endCampfireMutation, navigate],
  );

  const handleRejoin = () => {
    // setActiveCampfire({
    // });
  };

  const handleOnClickMenu = (key: string) => {
    setSelectedId('');
    console.log(selectedId, 'selectedId');
    console.log(key, 'key');
    if (key === 'addModerator') {
      setUserMenu(
        selectedId,
        campfireIdParam,
        { isModerator: true, isSpeaker: true },
        false,
        true,
        key,
      );
    }
    if (key === 'removeModerator' || key === 'addSpeaker') {
      setUserMenu(
        selectedId,
        campfireIdParam,
        { isModerator: false, isSpeaker: true },
        true,
        false,
        key,
      );
    }
    if (key === 'removeSpeaker') {
      setUserMenu(
        selectedId,
        campfireIdParam,
        { isModerator: false, isSpeaker: false },
        false,
        false,
        key,
      );
    }
    if (key === 'kick') {
      // TODO:
    }
    if (key === 'mute') {
      // TODO:
    }
    if (key === 'unmute') {
      // TODO:
    }
  };

  // USE EFFECTS
  useEffect(() => {
    if (!localUser?.isRaising) {
      setHandRaised(false);
    }
  }, [localUser]);

  useEffect(() => {
    if (currentUser) {
      const userData = {
        name: currentUser.name,
        profileUrl: currentUser.profileUrl,
        uid: currentUser.id,
      };
      setActiveUser(userData);
    }
  }, [currentUser]);

  useEffect(() => {
    if (campfireIdParam && activeUser) {
      refetchCampfireMember();
    }
  }, [activeUser, campfireIdParam, refetchCampfireMember]);

  useEffect(() => {
    if (campfireIdParam && campfireMember !== null) {
      refetchCampfire();
    }
  }, [campfireIdParam, refetchCampfire, campfireMember]);

  useEffect(() => {
    const onClickEvent = (e: any) => {
      if (e.target && e.target.id !== '_memberCard') {
        setSelectedId('');
      }
    };
    if (selectedId) {
      window.addEventListener('click', onClickEvent);
    }
    return () => {
      window.removeEventListener('click', onClickEvent);
    };
  }, [selectedId]);

  useEffect(() => {
    refetchTurnCredentials();

    return () => {
      leaveCampfire(currentUser?.id, campfireIdParam);
    };
  }, []);

  useEffect(
    () => () => {
      if (localStream) {
        localStream.getTracks().forEach((track: any) => track.stop());
      }
    },
    [localStream],
  );

  useEffect(() => {
    raiseHand(currentUser?.id || '', campfireIdParam, isRaising);
    setLocalUser({
      ...localUser,
      isRaising,
    });
  }, [isRaising]);

  useEffect(() => {
    if (currentUser && localStream && myPeerId && campfire) {
      joinCampfire({
        campfireId: campfireIdParam || '',
        userId: currentUser?.id || '',
        isAdmin: currentUser?.id === campfire?.creator?.uid,
        isModerator: currentUser?.id === campfire?.creator?.uid,
        isSpeaker: currentUser?.id === campfire?.creator?.uid,
        userName: currentUser?.name || '',
        profileUrl: currentUser?.profileUrl || '',
        peerId: myPeerId,
        streamId: localStream.id,
        stream: localStream,
      });
    }
  }, [currentUser, localStream, myPeerId, campfire]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    localStreamError && ToastMessage('error', 'Error', localStreamError, 10);
  }, [localStreamError]);

  useEffect(() => {
    if (isCampfireEnded) {
      navigate('/campfires');
    }
  }, [isCampfireEnded, navigate]);

  useEffect(() => {
    if (localStream) {
      const tracks = localStream.getAudioTracks();
      console.log(tracks, 'tracks');
    }
  }, [localStream]);

  useEffect(() => {
    if (localStream) {
      if (muteAll !== null && muteAll) {
        setIsMuted(true);
        localStream.getAudioTracks()[0].enabled = false;
      }

      if (muteAll !== null && muteAll === false) {
        setIsMuted(false);
        localStream.getAudioTracks()[0].enabled = true;
      }
    }
  }, [localStream, muteAll]);
  // END USE EFFECTS

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

  console.log(audienceStreams, 'audienceStreams');

  // DATA FILTER
  const filteredAudience = audienceStreams?.map((item: any) => {
    const strm = item.stream;
    // strm.getAudioTracks()[0].enabled = false;
    return {
      profileUrl: item.profileUrl,
      onClickMenu: (key: string) => handleOnClickMenu(key),
      speaker: item.userName,
      onClick: () => ({}),
      isSpeaker: false,
      isActive: false,
      uid: item.userId,
      // TODO:
      isRaising: item.isRaising,
      emoji: item.emoji,
      emojiId: item.emojiId,
      isMuted: false,
      stream: strm,
      isLocal: false,
    };
  });
  const filteredAdmins = adminStreams?.map((item: any) => ({
    profileUrl: item.profileUrl,
    onClickMenu: (key: string) => handleOnClickMenu(key),
    speaker: item.userName,
    onClick: () => ({}),
    isSpeaker: item.isSpeaker,
    isActive: true,
    uid: item.userId,
    isModerator: item.isModerator,
    // TODO:
    isRaising: false,
    emoji: item.emoji,
    emojiId: item.emojiId,
    isMuted: false,
    stream: item.stream,
    isLocal: false,
  }));
  const filterLocal =
    localUser && localUser.stream
      ? {
          profileUrl: localUser.profileUrl,
          onClickMenu: (key: string) => handleOnClickMenu(key),
          speaker: localUser.userName,
          onClick: () => ({}),
          uid: localUser.userId,
          isSpeaker: localUser.isSpeaker || localUser.isAdmin,
          isActive: localUser.isAdmin,
          isModerator: localUser.isModerator || localUser.isAdmin,
          // TODO:
          isRaising: localUser.isRaising,
          emoji: localUser.emoji,
          emojiId: localUser.emojiId,
          isMuted: false,
          stream: localUser.stream,
          isLocal: true,
        }
      : null;
  const audienceData =
    localUser && !(localUser.isModerator || localUser.isSpeaker)
      ? [filterLocal, ...filteredAudience]
      : filteredAudience;
  const adminData =
    localUser && (localUser.isModerator || localUser.isSpeaker)
      ? [filterLocal, ...filteredAdmins]
      : filteredAdmins;
  // END DATA FILTER

  const checkSafari = () => {
    const seemsChrome = navigator.userAgent.indexOf('Chrome') > -1;
    const seemsSafari = navigator.userAgent.indexOf('Safari') > -1;
    return seemsSafari && !seemsChrome;
  };

  console.log(checkSafari(), 'is safari');

  if (!isMediaSupported) {
    return (
      <NotSupportedContainer>
        <Result
          status="warning"
          title="Oops. It seems this browser does not support the media API yet. Try using one of this browsers: Chrome, Edge, Firefox, Opera or Safari."
          extra={
            <Button
              type="primary"
              key="console"
              onClick={() => navigate('/campfires')}>
              Back to Home
            </Button>
          }
        />
      </NotSupportedContainer>
    );
  }

  if (
    (fetchingCampfireError || localStreamError || fetchingTurnError) &&
    !isFetchingCampfireLoading &&
    !isFetchingCampfireMemberLoading &&
    !isLoadingCurrentUser &&
    !isFetchingTurnCredentialsLoading
  ) {
    return (
      <ActiveResult
        onClickHome={() => navigate('/campfires')}
        onClickRejoin={handleRejoin}
        data={!campfireMember || localStreamError ? undefined : campfire}
        error={fetchingCampfireError}
        streamError={localStreamError}
      />
    );
  }

  if (
    isFetchingCampfireLoading ||
    endCampfireLoading ||
    isFetchingCampfireMemberLoading ||
    isFetchingCampfireMembersLoading ||
    isLoadingCurrentUser ||
    !localStream ||
    isFetchingTurnCredentialsLoading ||
    !myPeerId
  ) {
    return <Loader style={mainLoader} />;
  }

  if (campfireIdParam && campfireMember && localStream && myPeerId) {
    return (
      <Layout>
        <TitleContent
          title={campfire?.topic || ''}
          description={campfire?.description || ''}
          onActive
          onClickStartDuration={() => {}}
          campfireId={campfireIdParam || ''}
          scheduleToStart={campfire?.scheduleToStart}
        />
        <ActiveSpeakersWrapper>
          <SpeakersArea
            data={adminData as MemberItemParams[]}
            onClick={handleClickMember}
            selectedId={selectedId}
            invites={[]}
          />
        </ActiveSpeakersWrapper>
        <AudienceWrapper>
          <MembersList
            onClick={handleClickMember}
            selectedId={selectedId}
            data={audienceData as MemberItemParams[]}
          />
        </AudienceWrapper>
        <CampfireFooter1
          id={activeUser?.uid || ''}
          profileUrl={activeUser?.profileUrl || ''}
          isRaising={isRaising}
          isSpeaker={localUser?.isSpeaker}
          onClickRaiseHand={handleClickRaiseHand}
          // onClickMuteMe={() => {}}
          onClickEmoji={handleOnClickEmoji}
          onClickMic={onClickMic}
          isAdmin={activeUser?.uid === campfire?.creator?.uid}
          onClickProfileMenu={handleOnClickProfileMenu}
          onMute={isMuted}
        />
        <Modal
          visible={isEndCampfireModal}
          closable={false}
          footer={[
            <Button onClick={() => setEndCampfireModal(false)}>Cancel</Button>,
            <Button
              danger
              onClick={() => {
                handleEndCampfire(campfireIdParam);
              }}>
              End Campfire
            </Button>,
          ]}>
          <b>Are you sure you want to end this campfire?</b>
        </Modal>
        <Modal
          visible={isKickAllModal}
          closable={false}
          footer={[
            <Button onClick={() => setKickAllModal(false)}>Cancel</Button>,
            kickAllMembersLoading ? (
              <LoadingOutlined style={loaderStyle} />
            ) : (
              <Button
                type="primary"
                onClick={() => {
                  // TODO: kick all
                  console.log('kick all');
                }}>
                Kick All
              </Button>
            ),
          ]}>
          <b>Are you sure you want to kick all audience for this campfire?</b>
        </Modal>
      </Layout>
    );
  }

  return <Loader style={mainLoader} />;
};

export default NewActiveTemplate;
