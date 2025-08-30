import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { parseLeadersApi } from '../../utils/helperLeaders';
import { LeaderData, validUlad } from '../../types/Leaders';
import { Loader } from '../../components/Loader';
import { Container, Heading } from 'react-bulma-components';
import { LeaderAvatar } from '../../components/LeaderAvatar';
import { getLeadersApi } from '../../api/leadersPage';
import { ErrorLoadAPINotice } from '../../components/ErrorLoadAPINotice';

function sortLeader(people: LeaderData[]): LeaderData[] {
  return people.sort((a, b) => a.sortOrderValue - b.sortOrderValue);
}

export const LeadersPage = () => {
  const [leaders, setLeaders] = useState<LeaderData[]>([]);
  const { loading, error, data } = getLeadersApi();

  useEffect(() => {
    if (data) {
      const parserData = parseLeadersApi(data);
      setLeaders(parserData);
    }
  }, [data]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {!error ? (
        <Container className="my-5">
          <Heading className="has-text-centered">{validUlad.STARSHYNA}</Heading>

          <div
            style={{ gap: '1.2rem' }}
            className="is-flex is-flex-wrap-wrap is-justify-content-space-evenly is-align-items-stretch "
          >
            {sortLeader(
              leaders.filter(leader =>
                leader.ulad.includes(validUlad.STARSHYNA),
              ),
            ).map(leader => {
              return (
                <LeaderAvatar
                  key={uuidv4()}
                  fullname={leader.fullname}
                  position={leader.position}
                  email={leader.email}
                  imgUrl={leader.imgUrl}
                />
              );
            })}
          </div>
        </Container>
      ) : (
        <ErrorLoadAPINotice />
      )}
    </>
  );
};
