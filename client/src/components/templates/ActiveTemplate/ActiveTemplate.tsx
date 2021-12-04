/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Layout, Grid, Modal, Button, Result } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery, useMutation } from 'react-query';
import io from 'socket.io-client';
import Peer from 'simple-peer';

import { ErrorModal } from '../../HOCs/ErrorModal';
import { ToastMessage } from '../../HOCs/ToastMessage';
import { AntdMessage } from '../../HOCs/AntdMessage';
import { ActiveResult } from '../../atoms/ActiveResult';
import { Loader } from '../../atoms/Loader';
import { TitleContent } from '../../molecules/TitleContent';
import { MemberItemParams } from '../../molecules/MemberItem/types';
import { SpeakersArea } from '../../organisms/SpeakersArea';
import { CampfireFooter1 } from '../../organisms/CampfireFooter1';
import { MembersList } from '../../organisms/MembersList';

import { useCampfireAction } from '../../../hooks/campfire';
import { useMemberAction } from '../../../hooks/member';
import { useUserState } from '../../../hooks/user';

import { MemberParams } from '../../../../common/domain/entities/member';

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

// export const StyledShadow = styled.div`
//   $$$ {
//     border: 1px solid #202020;
//     margin-top: 25px;
//     margin-left: 25px;
//     width: 158px;
//     height: 158px;
//     padding-top: 25px;
//     -webkit-box-shadow: 0px -4px 3px rgba(50, 50, 50, 0.75);
//     -moz-box-shadow: 0px -4px 3px rgba(50, 50, 50, 0.75);
//     box-shadow: 0px -4px 3px rgba(50, 50, 50, 0.75);
//   }
// `;

const { useBreakpoint } = Grid;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const ActiveTemplate = () => {
  const [isRaising, setHandRaised] = useState(false);
  const [selectedId, setSelectedId] = useState<string>('');
  const [peers, setPeers] = useState<any>(undefined);
  const [isMediaSupported, setIsMediaSupported] = useState<boolean>(true);
  const [avatarSize, setAvatarSize] = useState<number>();
  const [breakPoint, setBreakPoint] = useState<string>('');
  const [isInvalidDecryptedValue, setInvalidDecryptedValue] = useState<boolean>(
    false,
  );
  const [activeUser, setActiveUser] = useState<
    { name: string; profileUrl: string; uid: string } | undefined
  >(undefined);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isEndCampfireModal, setEndCampfireModal] = useState(false);
  const [isKickAllModal, setKickAllModal] = useState(false);
  const [isEndedCampfire, setEndedCampfire] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const screens = useBreakpoint();
  const {
    fetchCampfire,
    fetchCampfireMembers,
    deleteCampfire,
  } = useCampfireAction();
  const {
    fetchMember,
    updateMemberStatus,
    deleteMember,
    deleteMembers,
  } = useMemberAction();
  const {
    activeCampfire,
    setActiveCampfire,
    currentUser,
    isLoading: isLoadingCurrentUser,
  } = useUserState();
  const navigate = useNavigate();
  const { id: campfireIdParam } = useParams();
  const userVideo = useRef<any>();
  const peersRef = useRef<any>([]);

  const socket = io('http://localhost:5000', {
    // const socket = io('https://staging-campfire-api.azurewebsites.net', {
    // TODO: Need more research for the proper socket options
    // transports: ['websocket'],
  });

  const peerValues = [...Object.values(peers || {})] as {
    userId: string;
    socketId: string;
  }[];
  const filteredPeers = peerValues.filter(
    (userVal) => userVal.userId !== activeUser?.uid,
  );

  useEffect(() => {
    const fooz = Object.entries(screens).filter((screen) => !!screen[1]);
    try {
      if (fooz && fooz.length > 0) {
        setBreakPoint(fooz[fooz.length - 1][0]);
      }
    } catch (err) {
      console.log(err);
    }
  }, [screens]);

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
    error: fetchingCampfireMemberError,
  } = useQuery(
    ['campfire-member', campfireIdParam, activeUser?.uid],
    () => fetchMember({ uid: activeUser?.uid || '', id: campfireIdParam }),
    {
      // onSuccess: (res) => {

      //   console.log(res, 'refetch member');
      // },
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
    refetch: refetchCampfireMembers,
    data: campfireMembers,
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

  const createPeer = (
    callerId: string,
    stream: any,
    userDetail: any,
    memberId: string,
  ) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      streams: [stream],
    });
    peer.on('signal', (signal: any) => {
      socket.emit('send new user joined', {
        callerId,
        userDetail,
        peerSignal: signal,
        memberId,
      });
    });
    // peer._debug = console.log;
    return peer;
  };

  const addPeer = (
    incomingSignal: any,
    callerID: string,
    userId: string,
    stream: any,
    memberId: string,
  ) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      streams: [stream],
    });

    peer.on('signal', (signal: any) => {
      socket.emit('returning signal', { signal, userId, callerID, memberId });
    });

    peer.signal(incomingSignal);
    // peer._debug = console.log;
    return peer;
  };

  useEffect(() => {
    if (currentUser) {
      const userData = {
        name: currentUser.name,
        profileUrl: currentUser.profileUrl,
        uid: currentUser.id,
      };
      // const decryptedData = decipherText(data);
      // setInvalidDecryptedValue(false);
      // setActiveCampfireId(campfireIdParam);
      setActiveUser(userData);
      // ampfireId: string; name: string; profileUrl: string; uid: string
      // try {
      //   const decryptedData = decipherText(data);
      //   setInvalidDecryptedValue(false);
      //   setActiveCampfireId(decryptedData.campfireId);
      //   setActiveUser(decryptedData);
      //   ampfireId: string; name: string; profileUrl: string; uid: string
      // } catch (error) {
      //   setInvalidDecryptedValue(true);
      // }
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

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (
      campfireIdParam === campfire?._id &&
      activeCampfire === campfireIdParam &&
      activeUser &&
      campfireMember &&
      !fetchingCampfireError &&
      !fetchingCampfireMemberError
    ) {
      let userVideoStream: any;
      if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
        setIsMediaSupported(false);
        return;
      }
      navigator.mediaDevices
        .getUserMedia({ video: false, audio: true })
        .then((stream) => {
          setErrorMsg('');
          userVideo.current = {
            srcObject: stream,
          };

          userVideoStream = userVideo.current;

          socket.emit('join room', {
            campfireId: campfireIdParam,
            userId: activeUser?.uid,
            userName: activeUser?.name,
            profileUrl: activeUser?.profileUrl,
            isAdmin: activeUser?.uid === campfire.creator?.uid,
            isModerator: activeUser?.uid === campfire.creator?.uid,
            isSpeaker: activeUser?.uid === campfire.creator?.uid,
          });

          socket.on('send newUsers', (newUsers) => {
            const userId = activeUser?.uid || '';

            const { [userId]: val, ...restUsers } = newUsers;

            const allUsers = [...Object.values(newUsers || {})] as {
              userId: string;
              socketId: string;
            }[];
            const usersList = [...Object.values(restUsers || {})] as {
              userId: string;
              socketId: string;
              emoji: string;
              emojiId: string;
              peerObj: { signal: any };
            }[];

            let newUsersObj = allUsers.reduce((acc: any, curr: any) => {
              acc[curr.userId] = {
                ...curr,
                emoji: '',
                emojiId: '',
              };
              return acc;
            }, {});

            const filtered = usersList.filter(
              (userVal) => userVal.userId !== activeUser?.uid,
            );

            filtered.forEach((filteredItem) => {
              const userDetail = {
                campfireId: campfireIdParam,
                userId: activeUser?.uid || '',
                socketId: socket.id,
                isAdmin: activeUser?.uid === campfire.creator?.uid,
                isModerator: activeUser?.uid === campfire.creator?.uid,
                isSpeaker: activeUser?.uid === campfire.creator?.uid,
                userName: activeUser?.name || '',
                profileUrl: activeUser?.profileUrl,
              };

              const newPeer = createPeer(
                filteredItem.socketId,
                stream,
                userDetail,
                filteredItem.userId,
              );

              if (peersRef.current) {
                peersRef.current = {
                  ...peersRef.current,
                  [filteredItem.userId]: {
                    peer: newPeer,
                  },
                };
              }

              newUsersObj = {
                ...newUsersObj,
                [filteredItem.userId]: {
                  ...newUsersObj[filteredItem.userId],
                  peer: newPeer,
                },
              };
            });
            setPeers((prev: any) => ({
              ...prev,
              ...newUsersObj,
            }));
          });

          socket.on(
            'received new user joined',
            ({ userDetail, peerSignal, memberId }) => {
              if (peersRef.current) {
                if (!peersRef.current[userDetail.userId]) {
                  const peer = addPeer(
                    peerSignal,
                    userDetail.socketId,
                    userDetail.userId,
                    stream,
                    memberId,
                  );
                  peersRef.current = {
                    ...peersRef.current,
                    [userDetail.userId]: {
                      peer,
                    },
                  };
                  setPeers((users: any) => ({
                    ...users,
                    [userDetail.userId]: {
                      ...userDetail,
                      peer,
                    },
                  }));
                }
              }
            },
          );

          socket.on('receiving returned signal', (payload) => {
            if (peersRef.current) {
              const peerItem = peersRef.current[payload.memberId];
              if (peerItem) {
                peerItem.peer.signal(payload.signal);
              }
            }
          });

          socket.on(
            'receiving setUsers',
            ({ setValue, selectedUserId, operation }) => {
              if (operation === 'kick' && selectedUserId === activeUser?.uid) {
                setActiveCampfire(null);
                setActiveUser(undefined);
                AntdMessage('info', 'You have been kicked from this campfire');
              }
              if (operation === 'kickAll') {
                setActiveCampfire(null);
                setActiveUser(undefined);
                AntdMessage('info', 'You have been kicked from this campfire');
              }
              if (
                operation === 'addModerator' &&
                selectedUserId === activeUser?.uid
              ) {
                // updateMemberRole('moderator');
                AntdMessage(
                  'info',
                  'You have been added as a moderator on this campfire',
                );
              }
              if (
                operation === 'addSpeaker' &&
                selectedUserId === activeUser?.uid
              ) {
                // updateMemberRole('speaker');
                AntdMessage(
                  'info',
                  'You have been added as a speaker on this campfire',
                );
              }
              if (
                operation === 'removeSpeaker' &&
                selectedUserId === activeUser?.uid
              ) {
                // updateMemberRole('audience');
                AntdMessage('info', 'You have been removed as a speaker');
              }
              if (
                operation === 'removeModerator' &&
                selectedUserId === activeUser?.uid
              ) {
                // updateMemberRole('speaker');
                AntdMessage('info', 'You have been removed as a moderator');
              }
              if (operation === 'mute' && selectedUserId === activeUser?.uid) {
                // updateMember({ isMuted: true });
                AntdMessage('info', 'You have been muted.');
              }
              if (
                operation === 'unmute' &&
                selectedUserId === activeUser?.uid
              ) {
                // updateMember({ isMuted: false });
                AntdMessage('info', 'You are now unmuted.');
              }
              setPeers((prev: any) => {
                if (operation === 'kick') {
                  if (peersRef.current) {
                    const userPeer = peersRef.current[selectedUserId];
                    if (userPeer) {
                      userPeer.peer.destroy();
                    }

                    const {
                      [selectedUserId]: val,
                      ...restuserPeers
                    } = peersRef.current;
                    peersRef.current = restuserPeers;
                  }

                  const { [selectedUserId]: kickedPeer, ...restPeers } = prev;
                  return restPeers;
                }
                return {
                  ...prev,
                  [selectedUserId]: {
                    ...prev[selectedUserId],
                    ...setValue,
                  },
                };
              });
            },
          );

          socket.on('receiving raised signal', ({ userId, isRaised }) => {
            setPeers((prev: any) => ({
              ...prev,
              [userId]: {
                ...prev[userId],
                isRaising: isRaised,
              },
            }));
          });

          socket.on(
            'received setEmoji signal',
            ({ setEmojiUserId, emojiDetails }) => {
              setPeers((prev: any) => ({
                ...prev,
                [setEmojiUserId]: {
                  ...prev[setEmojiUserId],
                  ...emojiDetails,
                },
              }));
            },
          );

          socket.on('user leave', (leaveData: any) => {
            if (
              leaveData.userId &&
              leaveData.campfireId &&
              leaveData.campfireId === campfireIdParam
            ) {
              if (peersRef.current) {
                const userPeer = peersRef.current[leaveData.userId];
                if (userPeer) {
                  userPeer.peer.destroy();
                }

                const {
                  [leaveData.userId]: val,
                  ...restuserPeers
                } = peersRef.current;
                peersRef.current = restuserPeers;
              }

              setPeers((prev: any) => {
                const {
                  [leaveData.userId]: disconnectedUser,
                  ...otherUsers
                } = prev;
                return otherUsers;
              });
            }
          });

          socket.on('received end campfire', () => {
            AntdMessage('info', 'Campfire is ended by admin.');
            setActiveCampfire(null);
            setActiveUser(undefined);
            setEndedCampfire(true);
            setPeers(undefined);
          });

          socket.on('connect_error', () => {
            console.log('error socket');
          });

          if (isMuted) {
            stream.getAudioTracks()[0].enabled = false;
          } else {
            stream.getAudioTracks()[0].enabled = true;
          }
        })
        .catch((err: any) => {
          /* handle the error */
          if (err.message === 'Permission denied') {
            setErrorMsg(
              'Campfire requires access to your microphone so others on the call can hear you.',
            );
          } else {
            setErrorMsg(err.message);
          }
        });
      // eslint-disable-next-line consistent-return
      return () => {
        if (userVideoStream && userVideoStream.srcObject) {
          userVideoStream.srcObject
            .getTracks()
            .forEach((track: any) => track.stop());
        }
        socket.disconnect();
      };
    }
  }, [
    campfireIdParam,
    campfire,
    activeCampfire,
    fetchingCampfireError,
    fetchingCampfireMemberError,
    activeUser,
    campfireMember,
    isMuted,
  ]);

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    errorMsg && ToastMessage('error', 'Error', errorMsg, 10);
  }, [errorMsg]);

  const mainLoader = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1000,
    backgroundColor: '#000000d1',
  };

  const handleRejoin = () => {
    setActiveCampfire(campfireIdParam);
  };

  const {
    mutate: acceptPendingMember,
    isLoading: isAcceptMemberLoading,
    isSuccess: isAcceptMemberSuccess,
  } = useMutation(
    (params: { uid: string; id: string; status: string }) =>
      updateMemberStatus(params),
    {
      onSuccess: () => {
        refetchCampfireMembers();
      },
    },
  );

  const {
    mutate: declinePendingMember,
    isLoading: isDeclineMemberLoading,
    isSuccess: isDeclineMemberSuccess,
  } = useMutation(
    (params: { uid: string; id: string }) => deleteMember(params),
    {
      onSuccess: () => {
        refetchCampfireMembers();
      },
    },
  );

  const {
    mutate: kickMemberMutation,
    isLoading: kickMemberLoading,
    isSuccess: kickMemberSuccess,
  } = useMutation((params: { uid: string; id: string }) =>
    deleteMember(params),
  );

  const {
    mutate: kickAllMembersMutation,
    isLoading: kickAllMembersLoading,
    isSuccess: kickAllMembersSuccess,
  } = useMutation(
    (params: { uids: String[]; id: string }) => deleteMembers(params),
    {
      onSuccess: (res: any) => {
        setKickAllModal(false);
        AntdMessage('info', 'Succesfully kicked all audience.');

        setTimeout(() => {
          if (peersRef.current) {
            res?.uids.forEach((val: string) => {
              const userPeer = peersRef.current[val];
              if (userPeer) {
                userPeer.peer.destroy();
              }
              delete peersRef.current[val];
            });
          }

          setPeers((prev: any) => {
            const { ...newData } = prev;
            res?.uids.forEach((val: string) => {
              delete newData[val];
            });
            return newData;
          });
        }, 100);

        filteredPeers.forEach((val) => {
          socket.emit('setUsers', {
            campfireId: campfireIdParam,
            setValue: {},
            userSocketId: val.socketId,
            selectedUserId: res?.uids,
            operation: 'kickAll',
          });
        });
      },
    },
  );

  // const handleKickMembersCampfire = useCallback(
  //   (params: { id: string }) => {
  //     kickAllMembersMutation(params, {
  //       onSuccess: () => {
  //         filteredPeers.forEach((val) => {
  //           socket.emit('end campfire', {
  //             userSocketId: val.socketId,
  //             campfireId: activeCampfireId,
  //           });
  //         });
  //         navigate('/campfires');
  //       },
  //     });
  //   },
  //   [activeCampfireId, filteredPeers, socket],
  // );

  const {
    mutate: endCampfireMutation,
    isLoading: endCampfireLoading,
    isSuccess: endCampfireSuccess,
  } = useMutation((id: string) => deleteCampfire(id));

  const handleEndCampfire = useCallback(
    (id: string) => {
      endCampfireMutation(id, {
        onSuccess: () => {
          filteredPeers.forEach((val) => {
            socket.emit('end campfire', {
              userSocketId: val.socketId,
              campfireId: campfireIdParam,
            });
          });
          navigate('/campfires');
        },
      });
    },
    [campfireIdParam, filteredPeers, socket],
  );

  const handleOnClickPendingMenu = (
    key: 'accept' | 'acceptAll' | 'decline' | 'declineAll',
  ) => {
    const pendingMember = campfireMembers?.filter(
      (val) => val.uid === selectedId,
    );
    if (key === 'accept') {
      acceptPendingMember({
        uid: pendingMember?.[0].uid || '',
        id: campfireIdParam,
        status: 'invited',
      });
    }
    if (key === 'acceptAll') {
      console.log('acceptAll');
    }
    if (key === 'decline') {
      declinePendingMember({
        uid: pendingMember?.[0].uid || '',
        id: campfireIdParam,
      });
    }
    if (key === 'declineAll') {
      console.log('acceptAll');
    }
  };

  const newPeerData = (isModerator: boolean, isSpeaker: boolean) => {
    const newDataPeer = {
      isModerator,
      isSpeaker,
      emoji: '',
      emojiId: '',
    };
    setTimeout(() => {
      setPeers((prev: any) => ({
        ...prev,
        [selectedId]: {
          ...peers[selectedId],
          ...newDataPeer,
        },
      }));
    }, 100);
    return newDataPeer;
  };

  const handleOnClickMenu = (key: string, value: Partial<MemberParams>) => {
    let newPeerVal = {};
    setSelectedId('');
    if (key === 'addModerator') {
      newPeerVal = newPeerData(true, true);
    }
    if (key === 'removeModerator' || key === 'addSpeaker') {
      newPeerVal = newPeerData(false, true);
    }
    if (key === 'removeSpeaker') {
      newPeerVal = newPeerData(false, false);
    }
    if (key === 'kick') {
      kickMemberMutation({
        uid: selectedId,
        id: campfireIdParam,
      });
      setTimeout(() => {
        if (peersRef.current) {
          const userPeer = peersRef.current[selectedId];
          if (userPeer) {
            userPeer.peer.destroy();
          }

          const { [selectedId]: val, ...restuserPeers } = peersRef.current;
          peersRef.current = restuserPeers;
        }

        setPeers((prev: any) => {
          const { [selectedId]: kickedPeer, ...restPeers } = prev;
          return restPeers;
        });
      }, 100);
    }
    if (key === 'mute') {
      setTimeout(() => {
        setPeers((prev: any) => ({
          ...prev,
          [selectedId]: {
            ...peers[selectedId],
            isMuted: true,
          },
        }));
      }, 100);
      newPeerVal = { isMuted: true };
    }
    if (key === 'unmute') {
      setTimeout(() => {
        setPeers((prev: any) => ({
          ...prev,
          [selectedId]: {
            ...peers[selectedId],
            isMuted: false,
          },
        }));
      }, 100);
      newPeerVal = { isMuted: false };
    }

    filteredPeers.forEach((val) => {
      socket.emit('setUsers', {
        campfireId: campfireIdParam,
        setValue: newPeerVal,
        userSocketId: val.socketId,
        selectedUserId: selectedId,
        operation: key,
      });
    });
  };

  const filterInvites =
    activeUser?.uid === campfire?.creator?.uid &&
    campfireMembers &&
    campfireMembers.length > 0
      ? (campfireMembers
          ?.filter((val) => val.status === 'pending')
          .map((value) => ({
            onClickMenu: handleOnClickPendingMenu,
            speaker: value.name,
            onClick: () => ({}),
            uid: value.uid,
            profileUrl: value.profileUrl,
            isActive: false,
            isSpeaker: false,
          })) as MemberItemParams[])
      : [];

  const peersItem = [...Object.values(peers || {})] as {
    isAdmin: boolean;
    isModerator: boolean;
    isSpeaker: boolean;
    profileUrl: string;
    userName: string;
    userId: string;
    isRaising: boolean;
    emoji: string;
    emojiId: string;
    peer?: any;
    isMuted?: boolean;
    peerObj: any;
  }[];

  const speakers = peersItem
    .filter((peer) => peer.isAdmin || peer.isSpeaker)
    .map((value) => ({
      profileUrl: value.profileUrl,
      onClickMenu: (key: any) => handleOnClickMenu(key, value),
      speaker: value.userName,
      onClick: () => ({}),
      isSpeaker: value.isModerator || value.isSpeaker,
      isModerator: value.isModerator,
      isActive: true,
      uid: value.userId,
      isRaising: value.isRaising,
      emoji: value.emoji,
      emojiId: value.emojiId,
      peer: value.userId === activeUser?.uid ? userVideo : value?.peer,
      isLoggedIn: value.userId === activeUser?.uid,
      isMuted: value.isMuted,
    }));

  const members = peersItem
    .filter((peer) => !peer.isAdmin && !peer.isSpeaker)
    .map((value) => ({
      profileUrl: value.profileUrl,
      onClickMenu: (key: string) => handleOnClickMenu(key, value),
      speaker: value.userName,
      onClick: () => ({}),
      isSpeaker: false,
      isActive: false,
      uid: value.userId,
      isRaising: value.isRaising,
      emoji: value.emoji,
      emojiId: value.emojiId,
      peer: value.userId === activeUser?.uid ? userVideo : value?.peer,
      isLoggedIn: value.userId === activeUser?.uid,
      isMuted: value.isMuted,
    }));

  const memberIds = peersItem
    .filter((peer) => !peer.isAdmin && !peer.isSpeaker)
    .map((value) => value.userId);

  const handleOnClickEmoji = (
    selectedUserId: string,
    type: 'wink' | 'smile' | 'sweat' | 'cool',
  ) => {
    const emojiDetails = {
      emoji: type,
      emojiId: selectedUserId + Math.random().toString(36).substring(2),
    };
    setPeers((prev: any) => ({
      ...prev,
      [selectedUserId]: {
        ...prev[selectedUserId],
        ...emojiDetails,
      },
    }));

    filteredPeers.forEach((val) => {
      socket.emit('send setEmoji', {
        campfireId: campfireIdParam,
        selectedId: selectedUserId,
        emojiDetails,
        userSocketId: val.socketId,
      });
    });
  };

  const handleClickRaiseHand = (userId: string) => {
    setHandRaised((value) => {
      setPeers((prev: any) => ({
        ...prev,
        [userId]: {
          ...prev[userId],
          isRaising: !value,
        },
      }));
      filteredPeers.forEach((val) => {
        socket.emit('send raise signal', {
          campfireId: campfireIdParam,
          userId,
          isRaising: !value,
          userSocketId: val.socketId,
        });
      });
      return !value;
    });
  };

  const handleClickMember = (id: string) => {
    if (
      (activeUser?.uid === campfire?.creator?.uid &&
        id !== campfire?.creator?.uid) ||
      (campfireMember &&
        campfireMember.role === 'moderator' &&
        id !== campfire?.creator?.uid &&
        id !== campfireMember?.uid)
    ) {
      setSelectedId(id);
    }
  };

  // useEffect(() => {
  //   // eslint-disable-next-line no-undef
  //   // eslint-disable-next-line no-restricted-globals
  //   const screenWidth = screen.width;
  //   const size =
  //     members.length > speakers.length ? members.length : speakers.length;
  //   switch (breakPoint) {
  //     case 'xxl':
  //     case 'xl':
  //     case 'lg':
  //       // if (size <= 1) {
  //       //   setAvatarSize(screenWidth * 0.35);
  //       // } else if (size <= 2) {
  //       //   setAvatarSize(screenWidth * 0.3);
  //       // } else
  //       if (size <= 3) {
  //         setAvatarSize(screenWidth * 0.2);
  //       } else if (size >= 4 && size <= 8) {
  //         setAvatarSize(screenWidth * 0.2);
  //       } else if (size >= 9 && size <= 12) {
  //         setAvatarSize(screenWidth * 0.14);
  //       } else if (size >= 13 && size <= 28) {
  //         setAvatarSize(screenWidth * 0.12);
  //       } else if (size >= 29) {
  //         setAvatarSize(screenWidth * 0.11);
  //       }
  //       break;
  //     case 'md':
  //       // if (size === 1) {
  //       //   setAvatarSize(screenWidth * 0.25);
  //       // } else if (size === 2) {
  //       //   setAvatarSize(screenWidth * 0.2);
  //       // } else
  //       if (size <= 3) {
  //         setAvatarSize(200);
  //       } else if (size >= 4 && size <= 8) {
  //         setAvatarSize(150);
  //       } else if (size >= 9 && size >= 12) {
  //         setAvatarSize(120);
  //       } else if (size >= 13) {
  //         setAvatarSize(110);
  //       }
  //       break;
  //     case 'sm':
  //       // if (size === 1) {
  //       //   setAvatarSize(250);
  //       // } else if (size === 2) {
  //       //   setAvatarSize(200);
  //       // } else
  //       if (size <= 3) {
  //         setAvatarSize(150);
  //       } else if (size >= 4 && size <= 8) {
  //         setAvatarSize(120);
  //       } else if (size >= 9) {
  //         setAvatarSize(110);
  //       }
  //       break;
  //     case 'xs':
  //       // if (size === 1) {
  //       //   setAvatarSize(200);
  //       // } else if (size <= 2) {
  //       //   setAvatarSize(150);
  //       // } else
  //       if (size <= 3) {
  //         setAvatarSize(120);
  //       } else if (size >= 4) {
  //         setAvatarSize(110);
  //       }
  //       break;
  //     default:
  //       setAvatarSize(110);
  //   }
  // }, [speakers, members.length, speakers.length, breakPoint]);

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
    console.log(key, 'key');
  };

  const onClickMic = () => {
    setIsMuted(!isMuted);
  };

  const loaderStyle = {
    fontSize: 16,
    color: '#424242',
    marginLeft: 32,
    marginRight: 20,
  };

  if (isEndedCampfire && !activeCampfire) {
    return (
      <NotSupportedContainer>
        <Result
          status="warning"
          title="Campfire is ended."
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

  if (isInvalidDecryptedValue) {
    return (
      <>
        <Loader />
        <Modal
          title="Error"
          visible
          closable={false}
          footer={[
            <Button key="back" danger onClick={() => navigate(`/campfires`)}>
              Go Back
            </Button>,
          ]}>
          <b>Malformed data. Please provide a valid data value.</b>
        </Modal>
      </>
    );
  }

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
    (!activeCampfire ||
      fetchingCampfireError ||
      fetchingCampfireMemberError ||
      !campfireMember) &&
    !isFetchingCampfireLoading &&
    !isFetchingCampfireMemberLoading &&
    !isLoadingCurrentUser
  ) {
    return (
      <ActiveResult
        onClickHome={() => navigate('/campfires')}
        onClickRejoin={handleRejoin}
        data={!campfireMember ? undefined : campfire}
        error={fetchingCampfireError}
      />
    );
  }

  if (
    activeCampfire === campfireIdParam &&
    (isFetchingCampfireLoading ||
      endCampfireLoading ||
      isFetchingCampfireMemberLoading ||
      isFetchingCampfireMembersLoading ||
      isLoadingCurrentUser)
  ) {
    return <Loader style={mainLoader} />;
  }

  if (activeCampfire === campfireIdParam && campfireMember) {
    return (
      <Layout>
        <TitleContent
          title={campfire?.topic || ''}
          description={campfire?.description || ''}
          onActive
          // onClickStartDuration={() => {}}
          // campfireId={campfireIdParam || ''}
          scheduleToStart={campfire?.scheduleToStart}
        />
        <ActiveSpeakersWrapper>
          <SpeakersArea
            data={speakers}
            onClick={handleClickMember}
            selectedId={selectedId}
            invites={filterInvites}
            // size={avatarSize}
          />
        </ActiveSpeakersWrapper>
        {/* <StyledShadow /> */}
        <AudienceWrapper>
          <MembersList
            onClick={handleClickMember}
            selectedId={selectedId}
            data={members}
            // size={avatarSize}
          />
        </AudienceWrapper>
        <CampfireFooter1
          id={activeUser?.uid || ''}
          profileUrl={activeUser?.profileUrl || ''}
          // isMuted={false}
          isRaising={isRaising}
          isSpeaker={false}
          // isTalking={false}
          onClickRaiseHand={handleClickRaiseHand}
          // onClickMuteMe={() => {}}
          onClickEmoji={handleOnClickEmoji}
          onClickMic={onClickMic}
          isAdmin={activeUser?.uid === campfire?.creator?.uid}
          onClickProfileMenu={handleOnClickProfileMenu}
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
                  kickAllMembersMutation({
                    uids: memberIds,
                    id: campfireIdParam,
                  });
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

export default ActiveTemplate;
