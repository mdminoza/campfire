import React from 'react';
import { Row, Empty } from 'antd';

import { MemberItem } from '../../molecules/MemberItem';
import { AnimatedEmoji } from '../../molecules/AnimatedEmoji';
import { MemberItemParams } from '../../molecules/MemberItem/types';

import { Container, ItemWrapper, ItemCol, NoMemberWrapper } from './elements';

type Props = {
  data: Array<MemberItemParams | null>;
  onClick: (id: string) => void;
  selectedId: string;
  size?: number;
};

const MembersList = ({
  data,
  selectedId,
  onClick,
  size,
}: Props): React.ReactElement => (
  <Container>
    <Row gutter={[24, 32]} justify="center">
      {data && !data.includes(null) && data.length > 0 ? (
        data.map((_data: any) => (
          <ItemCol>
            <ItemWrapper>
              <AnimatedEmoji
                isAudience
                emoji={_data?.emoji || ''}
                emojiId={_data?.emojiId || ''}
              />
              <MemberItem
                key={_data?.uid}
                id={_data?.uid}
                selectedId={selectedId}
                profileUrl={_data?.profileUrl}
                onClickMenu={_data?.onClickMenu}
                speaker={_data?.speaker}
                onClick={onClick}
                isSpeaker={_data?.isSpeaker}
                isActive={_data?.isActive}
                isRaising={_data?.isRaising}
                isLoggedIn={_data?.isLoggedIn}
                isMuted={_data?.isMuted}
                // size={size}
                stream={_data?.stream}
              />
            </ItemWrapper>
          </ItemCol>
        ))
      ) : (
        <NoMemberWrapper>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No attendees yet"
          />
        </NoMemberWrapper>
      )}
    </Row>
  </Container>
);

export default MembersList;
