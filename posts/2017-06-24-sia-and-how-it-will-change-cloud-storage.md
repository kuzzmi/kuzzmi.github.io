---
layout:      post
date:        2017-06-24 12:00:59 +0200
title:       "Sia and How It Will Change Cloud Storage"
tags:        technology, cryptocurrency, siacoin, cloud
lang:        en
description: >
    Sia is a decentralized and encrypted cloud that uses blockchain technology
    for making cloud storage truly private. Here I give a few thoughts about it
    and why you should care.
---
![](/uploads/f2510206e3bc9fab0c68640f464fd283)

6 years ago I tried to enter cryptocurrency world, but had a bad luck, had not enough free money to invest and look at where Bitcoin is. After my few failures I decided to stop and leave this for future myself.

Time passed, I even forgot about cryptocurrencies and then accidentally found Sia. The idea behind it is amazing, but it also comes with what I missed in the past - cryptocurrency nature.

[Sia][1] is a decentralized and encrypted cloud that uses blockchain technology for making cloud storage truly private.

Essentially, as a product, Sia allows users to do 2 important things:
* rent storage in the cloud
* offer the storage you own for being rented

By using blockchain it ensures that only the person who rented the space can know what is stored inside.

Quoting their website:

> Cryptographically secured smart contracts ensure the encryption and transfer of data with no possibility for a third party to interfere in any way.
>
> [About - Sia](http://sia.tech/about/)

## How it works?

When you install the software needed for Sia to work, you will be prompted to create a new or restore a previously created wallet using what is called "a seed". The seed is a combination of 29 (if I remember correctly) words that are used to lock, unlock and restore your wallet from the network.

Not sure about the internals of algorithms, but think about it as some sort of a key, that allows the system to identify you as you, so you can use the cloud service and validate your identity when trying to access the data you store in the cloud.

After creating your wallet, you need to get Siacoins (about this later). Siacoin is a currency used on the network. After getting some coins, you are able to create a contract based on your desired amount of storage (this is what is called allowance). Then, when needed hosts are found, your contract starts and you can start uploading your data in the cloud.

The data is stored with high redundancy. That means your data is duplicated many times on many machines, so you can get your data back when some of the participants decide to leave the network, or their hard drives crash. So when you upload your data, your files are split, encrypted and then are uploaded to the cloud.

## Siacoin

Siacoin is a cryptocurrency that is used within Sia network. Siacoin is a minable currency, so basically if you want, you can use your GPU (regarding this a bit later) to run a program that makes tons of calculations to find a correct block. When a block is found you're rewarded with Siacoins.

By looking for and encouraging to look for a new block, Sia can ensure that all payments are correct, contracts between hoster and renter are valid, and to encrypt your data in such a manner that you and only you can get it back.

As this is a cryptocurrency related product, the easiest way is to buy it for Bitcoins. By the time I started, I had no Bitcoins, but I had some spare cash. And, trust me, it's hard to find a reliable source of Bitcoins, when you have cash and no experience in this field.

The service I use for getting Bitcoins for cash is [CEX.io][9]. There is also another service called [Bitstamp][10], but I haven't tried it yet. Both are fee-free for SEPA payments.

## Mining

Mining a coin in the cryptocurrency world means that you use hardware (CPU, GPU, [ASIC][11] etc) to make computations and find the next block, from which a blockchain is constructed. In a nutshell you download software, point to which wallet you want to get your reward and it starts computing. Essentially you do 2 things at once: make a network more difficult to break, and earn some money. This of course depends on your hardware.

There are ways of mining:
1. Solo mining. This means that you mine alone. You get rewarded only when you find a block.
2. Pool mining. This means you connect to a group of people and you together mine a block. You get rewarded for each valid shared calculation.

Also, depending on your hardware you can do **multi-coin** or **mono-coin** mining. What means, that you can sacrifice some of the computational power to mine several coins at once, or do full-power one-coin mining.

Before I bought Siacoins, I tried to do mono-coin solo-mining myself. After a while I realized that it's not going to work well on the short run and I found [A Beginner’s Guide to Mining Siacoin][12], which helped me to set everything up and to clarify some nuances.

Currently mining is done only using GPUs. However, about a week ago some rumors about Siacoin [ASIC][11] that is called Obelisk popped up.

## Obelisk

![](https://cdn-images-1.medium.com/max/1000/1*PYsHmInWQgpyuYqjvbgkYQ.jpeg)

[Obelisk][3] is Siacoin ASIC. It's a device that is used solely for mining Siacoin. That thing will be faster than any available GPU on the market in 10-100 times. Announcement was done on June, 23rd and announced price is $2500 in Bitcoins. It will be available in about a year. So good news is that we still can buy Siacoins cheap and mine them using just GPUs.

Obelisk in general is a very controversal subject. Many people are disappointed, others are happy. I'm on the "happy" side. The reasoning for why Obelist is good for Sia can be found in Taek's, a Sia developer, [blog post][7].

So generally people are not very happy, but the majority of them are still willing to support Sia as a product. And what makes a product a good product? Right the community!

## Community

From what I could find, there are several channels that can be used for getting in touch with people interested in Sia and Siacoin:
* [/r/siacoin][2]
* [Slack][5]
* [Sia Forum][13]
* [Telegram channel][14]

Generally people are friendly and very tolerant to new comers, they can answer a lot of questions, because Sia has a huge potential only when there are a lot of users. So basically contacting community is a win-win for both sides. You get answers and you might bring more people and this makes Sia better for everyone.

Development team is quite transparent with the community as well and the whole Sia thing is open-sourced.

## Future

Sia has a publicly available [roadmap][4], which contains a lot of great feature on their radar, so definitely go check it out.

There is a long way to go for Sia to get a fraction of the cloud storage market where Google and Amazon dominate, but each person that starts using Sia today influences how quickly this will happen.

---

If you have any questions or other thoughts, make sure to leave them in the comments section below.

_If you enjoyed this article, consider donating a coin ;)_

BTC: 33kD8ksvpRHvtgupbKn7nR4wLSUwnWbhMj  
SC: d697b7825f5c290ee71fc2d567d9220f1a220bb2b67170bf96c5e9be09a38440e00fcd66598c

[1]: http://sia.tech
[2]: https://www.reddit.com/r/siacoin/
[3]: https://obelisk.tech
[4]: https://trello.com/b/Io1dDyuI/sia-public-roadmap
[5]: http://slackin.sia.tech/
[6]: https://www.reddit.com/r/siacoin/comments/6j1gyg/obelisks_sia_asics_full_details/
[7]: https://blog.sia.tech/choosing-asics-for-sia-b318505b5b51
[8]: http://sia.tech/get-siacoin/
[9]: https://cex.io/r/0/up106737322/0/
[10]: https://www.bitstamp.net
[11]: https://en.wikipedia.org/wiki/Application-specific_integrated_circuit
[12]: https://mtlynch.io/windows-sia-mining/
[13]: https://forum.sia.tech
[14]: https://t.me/SiaCoin
