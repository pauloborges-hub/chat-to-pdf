"use server"

import { adminDb } from "@/firebaseAdmin";
import getBaseUrl from "@/lib/getBaseUrl";
import stripe from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";
import Stripe from "stripe";

export async function createStripePortal() {
   auth.protect()

   const { userId } = await auth()

   if (!userId) {
      throw new Error("User not found")
   }

   const user = await adminDb
      .collection("users")
      .doc(userId)
      .get()

   const stripeCustomerId = user.data()?.stripeCustomerId

   if (!stripeCustomerId) {
      throw new Error("Stripe customer not found")
   }

   const sessions = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: `${getBaseUrl()}/dashboard`
   })

   return sessions.url
}