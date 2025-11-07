import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/utils/mongodb";


export default async function handler(req:NextApiRequest, res:NextApiResponse){
    try{
        const client = await clientPromise;
        const db = client.db('MemoryDatabase');
        const items = await db.collection('items').find({}).toArray();
        res.status(200).json(items);
    }
    catch(e){
        console.error(e)
        res.status(500).json({error:'Failed to fetch Data'});
    }
}