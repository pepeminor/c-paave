import { mapV2 } from 'utils';
import { IListId, IPollCore, IPostCoreData, IAccountCore } from './SocialPost.type';
import { isArray, isNilOrEmpty } from 'ramda-adjunct';
import parse from 'html-react-parser';
import { SocialInfoResponse } from 'reduxs/SocialAccount';

export const formatPostById = (post: IPostCoreData) => {
  return {
    id: post.id,
    account: formatAccountItem(post.account),
    content: formatContentV2(post.content),
    createdAt: post.created_at,
    favourited: post.favourited,
    favouritesCount: post.favourites_count,
    visibility: post.visibility,
    bookmarked: post.bookmarked,
    inReplyToAccountId: post.in_reply_to_account_id,
    inReplyToId: post.in_reply_to_id,
    medias: post.media_attachments ?? [],
    reblogged: post.reblogged,
    reblogsCount: post.reblogs_count,
    repliesCount: post.replies_count,
    language: post.language,
    commentsList: [] as IListId[],
    poll: formatPoll(post.poll),
    mentions: post.mentions,
    tags: post.tags,
    rawContent: post.content,
  };
};

export const formatSocialPostList = (data: IPostCoreData[], notRemovePost?: boolean) => {
  let postJson = {};
  const arrayId = [] as IListId[];
  const originalList = [] as IListId[];

  mapV2(data, (post, i) => {
    //remove post comment if in_reply_to_id is not null or empty
    if (isNilOrEmpty(post.in_reply_to_id) || notRemovePost) {
      // notRemovePost: true =>return all post
      arrayId.push({
        id: post.id,
        indexAnimation: i,
        inReplyToId: post.in_reply_to_id,
      });
    }
    originalList.push({
      id: post.id,
      indexAnimation: i,
      inReplyToId: post.in_reply_to_id,
    });
    postJson = {
      ...postJson,
      [post.id]: formatPostById(post),
    };
  });

  return { postJson, arrayId, originalList };
};

export const formatAccountList = (data: IAccountCore[]) => {
  return mapV2(data, account => {
    return formatAccountItem(account);
  });
};

export const formatAccountItem = (account: IAccountCore | SocialInfoResponse) => {
  return {
    userName: account.username,
    displayName: account.display_name,
    avatar: account.avatar,
    acct: account.acct,
    avatarStatic: account.avatar_static,
    bot: account.bot,
    createdAt: account.created_at,
    locked: account.locked,
    statusesCount: account.statuses_count,
    id: account.id,
  };
};

export const formatPoll = (data: IPollCore | undefined | null) => {
  if (data == null) return null;

  return {
    id: data.id,
    expiresAt: data.expires_at,
    expired: data.expired,
    multiple: data.multiple,
    votesCount: data.votes_count,
    votersCount: data.voters_count,
    voted: data.voted,
    ownVotes: data.own_votes,
    options: data.options.map(option => {
      return {
        title: option.title,
        votesCount: option.votes_count,
      };
    }),
    emojis: data.emojis,
  };
};

export const formatContent = (content: string) => {
  const parseTextHTML = parse(content);
  let result = '';
  if (typeof parseTextHTML === 'string') {
    return parseTextHTML;
  }

  if (isArray(parseTextHTML)) {
    // parseTextHTML is array
    mapV2(parseTextHTML, item => {
      if (typeof item.props.children === 'string') {
        result = parseTextHTML.length === 1 ? `${result}${item.props.children}` : `${result}${item.props.children}\n`;
      } else if (isArray(item.props.children)) {
        mapV2(item.props.children, (child: JSX.Element) => {
          if (typeof child === 'string') {
            result = `${result}${child}`;
          } else if (child?.props?.className === 'mention hashtag') {
            const textChild: string = child?.props?.children?.[0] + child?.props?.children?.[1]?.props?.children;

            result = `${result}${textChild}`;
          } else if (child.type === 'a') {
            result = `${result}${child.props.href}`;
          }
        });
      }
    });
  } else {
    // parseTextHTML is object
    if (isArray(parseTextHTML.props.children)) {
      mapV2(parseTextHTML.props.children, (child: JSX.Element) => {
        if (typeof child === 'string') {
          result = `${result}${child}`;
        } else if (child?.props?.className === 'mention hashtag') {
          const textChild: string = child?.props?.children?.[0] + child?.props?.children?.[1]?.props?.children;

          result = `${result}${textChild}`;
        } else if (child.type === 'a') {
          result = `${result}${child.props.href}`;
        }
      });
    }

    if (typeof parseTextHTML.props.children === 'string') {
      result = `${result}${parseTextHTML.props.children}`;
    }
  }

  return result;
};

const formatContentV2 = (content: string) => {
  const parsedResult = parse(content, {
    transform(reactNode, _domNode, _index) {
      if (typeof reactNode === 'string') return reactNode;
      if (reactNode.type === 'a') return reactNode.props.children;
      if (reactNode.type === 'span') return reactNode.props.children;
      if (reactNode.type === 'br') return '\n';
      return reactNode;
    },
  });
  return parseJSX(parsedResult);
};

const parseJSX = (item: string | JSX.Element | JSX.Element[]): string => {
  if (typeof item === 'string') return item;
  if (Array.isArray(item)) {
    return item
      .flatMap(item => {
        return parseJSX(item);
      })
      .join('');
  }
  if (typeof item.props.children === 'string') return item.props.children as string;
  if (Array.isArray(item.props.children)) {
    return item.props.children
      .flatMap((item: any) => {
        return parseJSX(item);
      })
      .join('');
  }
  return parseJSX(item.props.children);
};
