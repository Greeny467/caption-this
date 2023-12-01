// document.addEventListener('DOMContentLoaded', function () {
//     const leaderboardList = document.getElementById('leaderboard-list');
  
//     // Sample data (replace with your data)
//     const leaderboardData = [
//       { name: 'Player 1', score: 150 },
//       { name: 'Player 2', score: 120 },
//       { name: 'Player 3', score: 180 },
//       // Add more entries as needed
//     ];
  
//     // Sort the data by score in descending order
//     leaderboardData.sort((a, b) => b.score - a.score);
  
//     // Display the leaderboard
//     leaderboardData.forEach((entry, index) => {
//       const listItem = document.createElement('li');
//       listItem.innerHTML = `
//         <span>${index + 1}</span>
//         <span>${entry.name}</span>
//         <span>${entry.score} points</span>
//       `;
//       leaderboardList.appendChild(listItem);
//     });
//   });

import Comment from'./comment';

import { loggedIn} from '../utils/auth';

import { useState, useEffect } from 'react';
import { useMutation, useQuery} from '@apollo/client';


export default function Leaderboard (post, user){
    const captionFilled = post.caption !== null;
    const postCaptions = post.captions;

    return(
        <>
            <div>
                <h1>leaderboard</h1>
                <section>
                    {postCaptions.map((caption, index) => (
                        <div>
                            <h4>{index}</h4>
                            <Comment item={caption} type='caption'/>
                        </div>
                    ))}
                </section>
            </div>
        </>
    )
}