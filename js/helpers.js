import { find, isEmpty, orderBy } from "lodash";

export function getCookies(){
  let cookies = {};
  for (let cookie of document.cookie.split('; ')) {
    let [name, value] = cookie.split("=");
    cookies[name] = decodeURIComponent(value);
  }
  return cookies;
}

export function setCookie(key, value){
  let expires = new Date();
  //30 days, 24 hours, 60 minutes, 60 seconds 1000 ms;
  expires.setTime(expires.getTime() + (30*24*60*60*1000));
  document.cookie = `${key}=${value};expires=${expires.toUTCString()}; path=/`;
}
export function deleteCookie(key){
  document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00 UTC`;
}

export function sortTeams(teams){
  let standings = {
    scaled: {1: [], 2: [], 3: [], 4: []},
    rx: {1: [], 2: [], 3: [], 4: []},
  };
  //first, for each team drop them into a bucket if they have a score.
  teams.forEach((team) => {
    if(team.scores[1]){
      standings[team.division][1].push({guid: team.guid, score: team.scores[1]});
    }
    if(team.scores[2]){
      standings[team.division][2].push({guid: team.guid, score: team.scores[2]});
    }
    if(team.scores[3]){
      standings[team.division][3].push({guid: team.guid, score: team.scores[3]});
    }
    if(team.scores[4]){
      standings[team.division][4].push({guid: team.guid, score: team.scores[4]});
    }

  });
  //lets now sort by the scores to get placement for each workout
  let sorted = {
    scaled: {
      1: orderBy(standings.scaled[1], ['score'], ['desc']),
      2: orderBy(standings.scaled[2], ['score'], ['desc']),
      3: orderBy(standings.scaled[3], ['score'], ['desc']),
      4: orderBy(standings.scaled[4], ['score'], ['desc']),
    },
    rx: {
      1: orderBy(standings.rx[1], ['score'], ['desc']),
      2: orderBy(standings.rx[2], ['score'], ['desc']),
      3: orderBy(standings.rx[3], ['score'], ['desc']),
      4: orderBy(standings.rx[4], ['score'], ['desc']),
    }
  }
  //ok so now we have the placement of each team  we can now walk each and create a standings
  let placed = {
    scaled: {
      1: sorted.scaled[1].map((item, index) => { item.placement = index+1; return item}),
      2: sorted.scaled[2].map((item, index) => { item.placement = index+1; return item}),
      3: sorted.scaled[3].map((item, index) => { item.placement = index+1; return item}),
      4: sorted.scaled[4].map((item, index) => { item.placement = index+1; return item}),
    },
    rx: {
      1: sorted.rx[1].map((item, index) => { item.placement = index+1; return item}),
      2: sorted.rx[2].map((item, index) => { item.placement = index+1; return item}),
      3: sorted.rx[3].map((item, index) => { item.placement = index+1; return item}),
      4: sorted.rx[4].map((item, index) => { item.placement = index+1; return item}),
    }
  }
  //now we have all the scores for each team.
  //walk the teams array again (yah, I know...) and inject their placement
  let sortedTeams = [];
  teams.forEach((team) => {
    let overall = 0;
    team.placement = {};
    if(team.scores[1]){
      //find them in the sorted array
      let result = find(placed[team.division][1], {'guid': team.guid});
      team.placement[1] = result.placement;
      overall += result.placement;
    }
    if(team.scores[2]){
      //find them in the sorted array
      let result = find(placed[team.division][2], {'guid': team.guid});
      team.placement[2] = result.placement;
      overall += result.placement;
    }
    if(team.scores[3]){
      //find them in the sorted array
      let result = find(placed[team.division][3], {'guid': team.guid});
      team.placement[3] = result.placement;
      overall += result.placement;
    }
    if(team.scores[4]){
      //find them in the sorted array
      let result = find(placed[team.division][4], {'guid': team.guid});
      team.placement[4] = result.placement;
      overall += result.placement;
    }
    team.overall = overall ? overall : null;
    sortedTeams.push(team);
  });

  //ANDDDDDD sort the teams.  Again.  Because now we have placement info

  return orderBy(sortedTeams, ['overall'], ['asc']);
}
