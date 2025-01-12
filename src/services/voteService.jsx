import { db } from '../config/firebase';
import { doc, setDoc, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore';

export const handleVote = async (issueId, userId, voteType) => {
    const voteId = `${issueId}_${userId}`;
    const voteRef = doc(db, 'votes', voteId);

    try {
        await setDoc(voteRef, {
            issueId,
            userId,
            voteType,
            timestamp: new Date()
        });
        return true;
    } catch (error) {
        console.error('Error voting:', error);
        return false;
    }
};

export const getVoteCounts = async (issueId) => {
    const votesRef = collection(db, 'votes');
    const q = query(votesRef, where('issueId', '==', issueId));
    
    const snapshot = await getDocs(q);
    let upvotes = 0;
    let downvotes = 0;
    
    snapshot.forEach(doc => {
        if (doc.data().voteType === 'upvote') upvotes++;
        if (doc.data().voteType === 'downvote') downvotes++;
    });
    
    return { upvotes, downvotes };
};