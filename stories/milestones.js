import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Button } from '@storybook/react/demo';
import { Provider } from 'react-redux';
import { init } from "@rematch/core";

// The *.mock.js files contains static redux stores configuration with no external dependencies (such as minimongo).
import * as models from "../imports/ui/services/models/index.mock.js";
//https://medium.com/ingenious/storybook-meets-redux-6ab09a5be346

import Stage from '../imports/ui/data/Milestones/Edit/Stage/index.js';

const store = init({
    models
});

const milestonesStage = JSON.parse('[{"_id":"qKG8R9b7L7qMhJ8Gz","id":"MDk6TWlsZXN0b25lMzgyMjA3MQ==","createdAt":"2018-11-14T16:26:13Z","updatedAt":"2018-11-28T16:42:33Z","closedAt":null,"description":null,"dueOn":"2018-11-28T00:00:00Z","issues":{"totalCount":3,"__typename":"IssueConnection"},"number":25,"state":"OPEN","title":"ARGO - Sprint 199","url":"https://github.com/overture-stack/score/milestone/25","__typename":"Milestone","repo":{"_id":"KHSibNuRvYkLzR2e5","id":"MDEwOlJlcG9zaXRvcnkzMjk1NDY3OA==","name":"score","url":"https://github.com/overture-stack/score","databaseId":32954678,"diskUsage":43319,"forkCount":6,"isPrivate":false,"isArchived":false,"issues":{"totalCount":35,"edges":[{"node":{"id":"MDU6SXNzdWUzNzUxNjAxMDU=","updatedAt":"2018-10-29T18:46:55Z","__typename":"Issue"},"__typename":"IssueEdge"}],"__typename":"IssueConnection"},"labels":{"totalCount":18,"__typename":"LabelConnection"},"milestones":{"totalCount":14,"__typename":"MilestoneConnection"},"pullRequests":{"totalCount":95,"__typename":"PullRequestConnection"},"releases":{"totalCount":0,"__typename":"ReleaseConnection"},"__typename":"Repository","org":{"name":"Overture","login":"overture-stack","id":"MDEyOk9yZ2FuaXphdGlvbjMyNDk4MjUw","url":"https://github.com/overture-stack","repositories":{"totalCount":20,"__typename":"RepositoryConnection"},"__typename":"Organization"},"active":true},"org":{"name":"Overture","login":"overture-stack","id":"MDEyOk9yZ2FuaXphdGlvbjMyNDk4MjUw","url":"https://github.com/overture-stack","repositories":{"totalCount":20,"__typename":"RepositoryConnection"},"__typename":"Organization"}},{"_id":"iih77BRw7CFYYmmgB","id":"MDk6TWlsZXN0b25lMzgyMjA2Nw==","createdAt":"2018-11-14T16:25:22Z","updatedAt":"2018-11-28T16:45:07Z","closedAt":null,"description":null,"dueOn":"2018-11-28T00:00:00Z","issues":{"totalCount":6,"__typename":"IssueConnection"},"number":19,"state":"OPEN","title":"ARGO - Sprint 199","url":"https://github.com/overture-stack/SONG/milestone/19","__typename":"Milestone","repo":{"_id":"zZNTCqX8rcJcawp98","id":"MDEwOlJlcG9zaXRvcnk4ODU2NDU5Mg==","name":"SONG","url":"https://github.com/overture-stack/SONG","databaseId":88564592,"diskUsage":4082,"forkCount":2,"isPrivate":false,"isArchived":false,"issues":{"totalCount":185,"edges":[{"node":{"id":"MDU6SXNzdWUzNzUxNjYyNTM=","updatedAt":"2018-10-29T18:56:01Z","__typename":"Issue"},"__typename":"IssueEdge"}],"__typename":"IssueConnection"},"labels":{"totalCount":35,"__typename":"LabelConnection"},"milestones":{"totalCount":15,"__typename":"MilestoneConnection"},"pullRequests":{"totalCount":181,"__typename":"PullRequestConnection"},"releases":{"totalCount":11,"__typename":"ReleaseConnection"},"__typename":"Repository","org":{"name":"Overture","login":"overture-stack","id":"MDEyOk9yZ2FuaXphdGlvbjMyNDk4MjUw","url":"https://github.com/overture-stack","repositories":{"totalCount":20,"__typename":"RepositoryConnection"},"__typename":"Organization"},"active":true},"org":{"name":"Overture","login":"overture-stack","id":"MDEyOk9yZ2FuaXphdGlvbjMyNDk4MjUw","url":"https://github.com/overture-stack","repositories":{"totalCount":20,"__typename":"RepositoryConnection"},"__typename":"Organization"}},{"_id":"3Axn5u9d47DtK2qru","id":"MDk6TWlsZXN0b25lMzgyMjA2Mw==","createdAt":"2018-11-14T16:23:08Z","updatedAt":"2018-11-23T15:13:41Z","closedAt":null,"description":null,"dueOn":"2018-11-28T00:00:00Z","issues":{"totalCount":5,"__typename":"IssueConnection"},"number":30,"state":"OPEN","title":"ARGO - Sprint 199","url":"https://github.com/overture-stack/ego/milestone/30","__typename":"Milestone","repo":{"_id":"NhFPrH4XYL8NFrTDK","id":"MDEwOlJlcG9zaXRvcnkxMDYwMDc3MTU=","name":"ego","url":"https://github.com/overture-stack/ego","databaseId":106007715,"diskUsage":1307,"forkCount":2,"isPrivate":false,"isArchived":false,"issues":{"totalCount":84,"edges":[{"node":{"id":"MDU6SXNzdWUyNzQ2NzU5MDk=","updatedAt":"2018-10-29T21:22:54Z","__typename":"Issue"},"__typename":"IssueEdge"}],"__typename":"IssueConnection"},"labels":{"totalCount":22,"__typename":"LabelConnection"},"milestones":{"totalCount":20,"__typename":"MilestoneConnection"},"pullRequests":{"totalCount":89,"__typename":"PullRequestConnection"},"releases":{"totalCount":8,"__typename":"ReleaseConnection"},"__typename":"Repository","org":{"name":"Overture","login":"overture-stack","id":"MDEyOk9yZ2FuaXphdGlvbjMyNDk4MjUw","url":"https://github.com/overture-stack","repositories":{"totalCount":20,"__typename":"RepositoryConnection"},"__typename":"Organization"},"active":true},"org":{"name":"Overture","login":"overture-stack","id":"MDEyOk9yZ2FuaXphdGlvbjMyNDk4MjUw","url":"https://github.com/overture-stack","repositories":{"totalCount":20,"__typename":"RepositoryConnection"},"__typename":"Organization"}},{"_id":"y8Bs2WYzQ3rBaSPuj","id":"MDk6TWlsZXN0b25lMzgyNDQ3Mw==","createdAt":"2018-11-15T13:50:49Z","updatedAt":"2018-11-16T22:12:20Z","closedAt":null,"description":null,"dueOn":"2018-11-28T00:00:00Z","issues":{"totalCount":1,"__typename":"IssueConnection"},"number":12,"state":"OPEN","title":"ARGO - Sprint 199","url":"https://github.com/overture-stack/roadmap/milestone/12","__typename":"Milestone","repo":{"_id":"7JnJwmC48qFY8R54q","id":"MDEwOlJlcG9zaXRvcnkxMTIzODM5MzI=","name":"roadmap","url":"https://github.com/overture-stack/roadmap","databaseId":112383932,"diskUsage":0,"forkCount":0,"isPrivate":false,"isArchived":false,"issues":{"totalCount":10,"edges":[{"node":{"id":"MDU6SXNzdWUzNzUxNTg0ODM=","updatedAt":"2018-10-30T15:34:32Z","__typename":"Issue"},"__typename":"IssueEdge"}],"__typename":"IssueConnection"},"labels":{"totalCount":20,"__typename":"LabelConnection"},"milestones":{"totalCount":5,"__typename":"MilestoneConnection"},"pullRequests":{"totalCount":0,"__typename":"PullRequestConnection"},"releases":{"totalCount":0,"__typename":"ReleaseConnection"},"__typename":"Repository","org":{"name":"Overture","login":"overture-stack","id":"MDEyOk9yZ2FuaXphdGlvbjMyNDk4MjUw","url":"https://github.com/overture-stack","repositories":{"totalCount":20,"__typename":"RepositoryConnection"},"__typename":"Organization"},"active":true},"org":{"name":"Overture","login":"overture-stack","id":"MDEyOk9yZ2FuaXphdGlvbjMyNDk4MjUw","url":"https://github.com/overture-stack","repositories":{"totalCount":20,"__typename":"RepositoryConnection"},"__typename":"Organization"}},{"_id":"dYzcT4cZgJTHZH2kj","id":"MDk6TWlsZXN0b25lMzgyMjA3MA==","createdAt":"2018-11-14T16:26:01Z","updatedAt":"2018-11-14T16:26:03Z","closedAt":null,"description":null,"dueOn":"2018-11-28T00:00:00Z","issues":{"totalCount":1,"__typename":"IssueConnection"},"number":13,"state":"OPEN","title":"ARGO - Sprint 199","url":"https://github.com/overture-stack/riff/milestone/13","__typename":"Milestone","repo":{"_id":"2zZ3XMiqnzEgR3Bqo","id":"MDEwOlJlcG9zaXRvcnkxMjYwNjg0MzA=","name":"riff","url":"https://github.com/overture-stack/riff","databaseId":126068430,"diskUsage":160,"forkCount":0,"isPrivate":false,"isArchived":false,"issues":{"totalCount":5,"edges":[{"node":{"id":"MDU6SXNzdWUzNzUxNjA0MTA=","updatedAt":"2018-10-29T18:57:33Z","__typename":"Issue"},"__typename":"IssueEdge"}],"__typename":"IssueConnection"},"labels":{"totalCount":18,"__typename":"LabelConnection"},"milestones":{"totalCount":4,"__typename":"MilestoneConnection"},"pullRequests":{"totalCount":12,"__typename":"PullRequestConnection"},"releases":{"totalCount":6,"__typename":"ReleaseConnection"},"__typename":"Repository","org":{"name":"Overture","login":"overture-stack","id":"MDEyOk9yZ2FuaXphdGlvbjMyNDk4MjUw","url":"https://github.com/overture-stack","repositories":{"totalCount":20,"__typename":"RepositoryConnection"},"__typename":"Organization"},"active":true},"org":{"name":"Overture","login":"overture-stack","id":"MDEyOk9yZ2FuaXphdGlvbjMyNDk4MjUw","url":"https://github.com/overture-stack","repositories":{"totalCount":20,"__typename":"RepositoryConnection"},"__typename":"Organization"}},{"_id":"TfTspXYmzAKpZDkt9","id":"MDk6TWlsZXN0b25lMzg0MzM4Ng==","createdAt":"2018-11-23T17:39:01Z","updatedAt":"2018-11-28T16:34:07Z","closedAt":null,"description":null,"dueOn":"2018-11-28T00:00:00Z","issues":{"totalCount":2,"__typename":"IssueConnection"},"number":12,"state":"OPEN","title":"ARGO - Sprint 199","url":"https://github.com/overture-stack/enrolment/milestone/12","__typename":"Milestone","repo":{"_id":"5nqQhr2qy6WCevB89","id":"MDEwOlJlcG9zaXRvcnkxMDc3MDExOTY=","name":"enrolment","url":"https://github.com/overture-stack/enrolment","databaseId":107701196,"diskUsage":781,"forkCount":1,"isPrivate":false,"isArchived":false,"issues":{"totalCount":76,"edges":[{"node":{"id":"MDU6SXNzdWUzNzUwNDUzMDU=","updatedAt":"2018-10-31T14:58:45Z","__typename":"Issue"},"__typename":"IssueEdge"}],"__typename":"IssueConnection"},"labels":{"totalCount":22,"__typename":"LabelConnection"},"milestones":{"totalCount":10,"__typename":"MilestoneConnection"},"pullRequests":{"totalCount":33,"__typename":"PullRequestConnection"},"releases":{"totalCount":0,"__typename":"ReleaseConnection"},"__typename":"Repository","org":{"name":"Overture","login":"overture-stack","id":"MDEyOk9yZ2FuaXphdGlvbjMyNDk4MjUw","url":"https://github.com/overture-stack","repositories":{"totalCount":20,"__typename":"RepositoryConnection"},"__typename":"Organization"},"active":true},"org":{"name":"Overture","login":"overture-stack","id":"MDEyOk9yZ2FuaXphdGlvbjMyNDk4MjUw","url":"https://github.com/overture-stack","repositories":{"totalCount":20,"__typename":"RepositoryConnection"},"__typename":"Organization"}},{"_id":"wjbvfppMsdh9sHnLP","id":"MDk6TWlsZXN0b25lMzgyMjA1OQ==","createdAt":"2018-11-14T16:21:30Z","updatedAt":"2018-11-22T17:42:56Z","closedAt":null,"description":null,"dueOn":"2018-11-28T00:00:00Z","issues":{"totalCount":1,"__typename":"IssueConnection"},"number":5,"state":"OPEN","title":"ARGO - Sprint 199","url":"https://github.com/overture-stack/rollcall/milestone/5","__typename":"Milestone","repo":{"_id":"PFKg4vZA8XbwBN5RJ","id":"MDEwOlJlcG9zaXRvcnkxNDI0ODMyNzU=","name":"rollcall","url":"https://github.com/overture-stack/rollcall","databaseId":142483275,"diskUsage":168,"forkCount":0,"isPrivate":false,"isArchived":false,"issues":{"totalCount":3,"edges":[{"node":{"id":"MDU6SXNzdWUzNzUxNjA2MzI=","updatedAt":"2018-10-29T18:57:28Z","__typename":"Issue"},"__typename":"IssueEdge"}],"__typename":"IssueConnection"},"labels":{"totalCount":16,"__typename":"LabelConnection"},"milestones":{"totalCount":2,"__typename":"MilestoneConnection"},"pullRequests":{"totalCount":4,"__typename":"PullRequestConnection"},"releases":{"totalCount":2,"__typename":"ReleaseConnection"},"__typename":"Repository","org":{"name":"Overture","login":"overture-stack","id":"MDEyOk9yZ2FuaXphdGlvbjMyNDk4MjUw","url":"https://github.com/overture-stack","repositories":{"totalCount":20,"__typename":"RepositoryConnection"},"__typename":"Organization"},"active":true},"org":{"name":"Overture","login":"overture-stack","id":"MDEyOk9yZ2FuaXphdGlvbjMyNDk4MjUw","url":"https://github.com/overture-stack","repositories":{"totalCount":20,"__typename":"RepositoryConnection"},"__typename":"Organization"}},{"_id":"nSzj8ToePYfFq9c9a","id":"MDk6TWlsZXN0b25lMzgyMjQwMw==","createdAt":"2018-11-14T18:32:01Z","updatedAt":"2018-11-14T20:24:57Z","closedAt":null,"description":null,"dueOn":"2018-11-28T00:00:00Z","issues":{"totalCount":1,"__typename":"IssueConnection"},"number":1,"state":"OPEN","title":"ARGO - Sprint 199","url":"https://github.com/icgc-dcc/dcc-docs/milestone/1","__typename":"Milestone","repo":{"_id":"eQ7aYpWbdGaDx4Asf","id":"MDEwOlJlcG9zaXRvcnk0NzM0NTA1Mg==","name":"dcc-docs","url":"https://github.com/icgc-dcc/dcc-docs","databaseId":47345052,"diskUsage":49772,"forkCount":0,"isPrivate":false,"isArchived":false,"issues":{"totalCount":3,"edges":[{"node":{"id":"MDU6SXNzdWUzMzYyNjI1ODM=","updatedAt":"2018-06-27T14:47:52Z","__typename":"Issue"},"__typename":"IssueEdge"}],"__typename":"IssueConnection"},"labels":{"totalCount":15,"__typename":"LabelConnection"},"milestones":{"totalCount":0,"__typename":"MilestoneConnection"},"pullRequests":{"totalCount":43,"__typename":"PullRequestConnection"},"releases":{"totalCount":0,"__typename":"ReleaseConnection"},"__typename":"Repository","org":{"name":"ICGC DCC","login":"icgc-dcc","id":"MDEyOk9yZ2FuaXphdGlvbjE1MDg2Mzg=","url":"https://github.com/icgc-dcc","repositories":{"totalCount":48,"__typename":"RepositoryConnection"},"__typename":"Organization"},"active":true},"org":{"name":"ICGC DCC","login":"icgc-dcc","id":"MDEyOk9yZ2FuaXphdGlvbjE1MDg2Mzg=","url":"https://github.com/icgc-dcc","repositories":{"totalCount":48,"__typename":"RepositoryConnection"},"__typename":"Organization"}},{"_id":"ZA26eSRkMhncXHcqA","id":"MDk6TWlsZXN0b25lMzgyMjYzMA==","createdAt":"2018-11-14T20:10:36Z","updatedAt":"2018-11-14T20:10:36Z","closedAt":null,"description":null,"dueOn":"2018-11-28T00:00:00Z","issues":{"totalCount":1,"__typename":"IssueConnection"},"number":6,"state":"OPEN","title":"ARGO - Sprint 199","url":"https://github.com/icgc-dcc/dcc-repository/milestone/6","__typename":"Milestone","repo":{"_id":"8jPmQ5RuCie2JrjjT","id":"MDEwOlJlcG9zaXRvcnk1MjI4ODgzOA==","name":"dcc-repository","url":"https://github.com/icgc-dcc/dcc-repository","databaseId":52288838,"diskUsage":1014,"forkCount":3,"isPrivate":false,"isArchived":false,"issues":{"totalCount":7,"edges":[{"node":{"id":"MDU6SXNzdWUzNzAzMTUzMDA=","updatedAt":"2018-10-30T17:41:43Z","__typename":"Issue"},"__typename":"IssueEdge"}],"__typename":"IssueConnection"},"labels":{"totalCount":17,"__typename":"LabelConnection"},"milestones":{"totalCount":4,"__typename":"MilestoneConnection"},"pullRequests":{"totalCount":22,"__typename":"PullRequestConnection"},"releases":{"totalCount":0,"__typename":"ReleaseConnection"},"__typename":"Repository","org":{"name":"ICGC DCC","login":"icgc-dcc","id":"MDEyOk9yZ2FuaXphdGlvbjE1MDg2Mzg=","url":"https://github.com/icgc-dcc","repositories":{"totalCount":48,"__typename":"RepositoryConnection"},"__typename":"Organization"},"active":true},"org":{"name":"ICGC DCC","login":"icgc-dcc","id":"MDEyOk9yZ2FuaXphdGlvbjE1MDg2Mzg=","url":"https://github.com/icgc-dcc","repositories":{"totalCount":48,"__typename":"RepositoryConnection"},"__typename":"Organization"}},{"_id":"LKnfGJ2XP9PTzRDHn","id":"MDk6TWlsZXN0b25lMzgyMDg2NQ==","createdAt":"2018-11-14T10:18:42Z","updatedAt":"2018-11-28T16:44:19Z","closedAt":null,"description":null,"dueOn":"2018-11-28T00:00:00Z","issues":{"totalCount":3,"__typename":"IssueConnection"},"number":20,"state":"OPEN","title":"ARGO - Sprint 199","url":"https://github.com/icgc-dcc/dcc-portal/milestone/20","__typename":"Milestone","repo":{"_id":"BbxafDqGFhF6qdy7L","id":"MDEwOlJlcG9zaXRvcnk2MjI0MjExMA==","name":"dcc-portal","url":"https://github.com/icgc-dcc/dcc-portal","databaseId":62242110,"diskUsage":15159,"forkCount":3,"isPrivate":false,"isArchived":false,"issues":{"totalCount":99,"edges":[{"node":{"id":"MDU6SXNzdWUzMTk3MTkxNTE=","updatedAt":"2018-10-31T16:34:16Z","__typename":"Issue"},"__typename":"IssueEdge"}],"__typename":"IssueConnection"},"labels":{"totalCount":25,"__typename":"LabelConnection"},"milestones":{"totalCount":16,"__typename":"MilestoneConnection"},"pullRequests":{"totalCount":459,"__typename":"PullRequestConnection"},"releases":{"totalCount":2,"__typename":"ReleaseConnection"},"__typename":"Repository","org":{"name":"ICGC DCC","login":"icgc-dcc","id":"MDEyOk9yZ2FuaXphdGlvbjE1MDg2Mzg=","url":"https://github.com/icgc-dcc","repositories":{"totalCount":48,"__typename":"RepositoryConnection"},"__typename":"Organization"},"active":true},"org":{"name":"ICGC DCC","login":"icgc-dcc","id":"MDEyOk9yZ2FuaXphdGlvbjE1MDg2Mzg=","url":"https://github.com/icgc-dcc","repositories":{"totalCount":48,"__typename":"RepositoryConnection"},"__typename":"Organization"}},{"_id":"HNvzhcsvRyorhy5St","id":"MDk6TWlsZXN0b25lMzg0MTEwOA==","createdAt":"2018-11-22T14:43:42Z","updatedAt":"2018-11-28T16:35:11Z","closedAt":null,"description":null,"dueOn":"2018-11-28T00:00:00Z","issues":{"totalCount":1,"__typename":"IssueConnection"},"number":2,"state":"OPEN","title":"ARGO - Sprint 199","url":"https://github.com/icgc-dcc/issues-tracker/milestone/2","__typename":"Milestone","repo":{"_id":"pT2fhPHgsRWjtMuA5","id":"MDEwOlJlcG9zaXRvcnkxNDkxNzI4ODk=","name":"issues-tracker","url":"https://github.com/icgc-dcc/issues-tracker","databaseId":149172889,"diskUsage":14,"forkCount":0,"isPrivate":false,"isArchived":false,"issues":{"totalCount":3,"edges":[{"node":{"id":"MDU6SXNzdWUzNjA5OTc4MTA=","updatedAt":"2018-09-27T14:54:40Z","__typename":"Issue"},"__typename":"IssueEdge"}],"__typename":"IssueConnection"},"labels":{"totalCount":10,"__typename":"LabelConnection"},"milestones":{"totalCount":2,"__typename":"MilestoneConnection"},"pullRequests":{"totalCount":0,"__typename":"PullRequestConnection"},"releases":{"totalCount":0,"__typename":"ReleaseConnection"},"__typename":"Repository","org":{"name":"ICGC DCC","login":"icgc-dcc","id":"MDEyOk9yZ2FuaXphdGlvbjE1MDg2Mzg=","url":"https://github.com/icgc-dcc","repositories":{"totalCount":48,"__typename":"RepositoryConnection"},"__typename":"Organization"},"active":true},"org":{"name":"ICGC DCC","login":"icgc-dcc","id":"MDEyOk9yZ2FuaXphdGlvbjE1MDg2Mzg=","url":"https://github.com/icgc-dcc","repositories":{"totalCount":48,"__typename":"RepositoryConnection"},"__typename":"Organization"}}]');

storiesOf('Milestones', module)
    .addDecorator(story => <Provider store={store}>{story()}</Provider>)
    .add('Staging Table', () => {
        store.dispatch.milestonesEdit.setStageFlag(true);
        store.dispatch.milestonesEdit.setAction('close');
        store.dispatch.milestonesEdit.setMilestones(milestonesStage);
        return (
            <Stage />
        );
    })
;