/*
,
    {
        "text": "something",
        "author": "something",
        "source": "something"
    }
*/

// To compile/decompile:
// Minify - https://codebeautify.org/jsonminifier
// Stringify - https://onlinetexttools.com/json-stringify-text
const DEFAULT_QUOTEBOOK_DATA = [
    {
        "text": "Let them see my weakness, and let them see me overcome it.",
        "author": "Kelsier",
        "source": "Mistborn: The Final Empire"
    },
    {
        "text": "I represent that one thing you’ve never been able to kill, no matter how hard you try. I am Hope.",
        "author": "Kelsier",
        "source": "Mistborn: The Final Empire"
    },
    {
        "text": "A man can only stumble for so long before he either falls or stands up straight.",
        "author": "Tindwyl",
        "source": "Mistborn: The Well of Ascension"
    },
    {
        "text": "The right belief is like a good cloak, I think. If it fits you well, it keeps you warm and safe. The wrong fit, however, can suffocate.",
        "author": "Sazed",
        "source": "Mistborn: The Final Empire"
    },
    {
        "text": "You should try not to talk so much, friend. You’ll sound far less stupid that way.",
        "author": "Breeze",
        "source": "Mistborn: The Final Empire"
    },
    {
        "text": "The life of a person is more than the chaos of its passing.",
        "author": "Vin",
        "source": "Mistborn: The Hero of Ages"
    },
    {
        "text": "I, unfortunately, am the Hero of Ages.",
        "author": "Unknown",
        "source": "Mistborn: The Hero of Ages"
    },
    {
        "text": "A man was defined not by his flaws, but by how he overcame them.",
        "author": "Zane",
        "source": "Mistborn: The Well of Ascension"
    },
    {
        "text": "Our belief is often strongest when it should be weakest. That is the nature of hope.",
        "author": "Sazed",
        "source": "Mistborn: The Final Empire"
    },
    {
        "text": "Belief isn’t simply a thing for fair times and bright days. What is belief&mdash;what is faith&mdash;if you don’t continue in it after failure?",
        "author": "Sazed",
        "source": "Mistborn: The Final Empire"
    },
    {
        "text": "There’s always another secret.",
        "author": "Kelsier",
        "source": "Mistborn: The Final Empire"
    },
    {
        "text": "Books have great value. Actions have greater value.",
        "author": "Elend",
        "source": "Mistborn: The Well of Ascension"
    },
    {
        "text": "It does not do to dwell on dreams and forget to live.",
        "author": "Albus Dumbledore",
        "source": "Harry Potter and the Sorceror’s Stone"
    },
    {
        "text": "It is important, to fight, and fight again, and keep fighting, for only then could evil be kept at bay, though never quite eradicated.",
        "author": "Albus Dumbledore",
        "source": "Harry Potter and the Half-Blood Prince"
    },
    {
        "text": "Where your treasure is, there will your heart be also.",
        "author": "Matthew 6:21"
    },
    {
        "text": "It takes a great deal of bravery to stand up to our enemies, but just as much to stand up to our friends.",
        "author": "Albus Dumbledore",
        "source": "Harry Potter and the Sorceror’s Stone"
    },
    {
        "text": "Never trust anything that can think for itself if you can’t see where it keeps its brain.",
        "author": "Arthur Weasley",
        "source": "Harry Potter and the Chamber of Secrets"
    },
    {
        "text": "If you want to know what a man’s like, take a good look at how he treats his inferiors, not his equals.",
        "author": "Sirius Black",
        "source": "Harry Potter and the Goblet of Fire"
    },
    {
        "text": "No good sittin’ worryin’ abou’ it. What’s comin’ will come, an’ we’ll meet it when it does.",
        "author": "Rubeus Hagrid",
        "source": "Harry Potter and the Goblet of Fire"
    },
    {
        "text": "Things we lose have a way of coming back to us in the end, if not always in the way we expect.",
        "author": "Luna Lovegood",
        "source": "Harry Potter and the Order of the Phoenix"
    },
    {
        "text": "To the well-organized mind, death is but the next great adventure.",
        "author": "Albus Dumbledore",
        "source": "Harry Potter and the Sorceror’s Stone"
    },
    {
        "text": "Fear of a name only increases fear of the thing itself.",
        "author": "Hermione Granger",
        "source": "Harry Potter and the Chamber of Secrets"
    },
    {
        "text": "I solemnly swear I am up to no good.",
        "author": "Harry Potter",
        "source": "Harry Potter and the Prisoner of Azkaban"
    },
    {
        "text": "You know, happiness can be found even in the darkest of times, if one only remembers to turn on the light.",
        "author": "Albus Dumbledore",
        "source": "Harry Potter and the Prisoner of Azkaban"
    },
    {
        "text": "It matters not what someone is born, but what they grow to be.",
        "author": "Albus Dumbledore",
        "source": "Harry Potter and the Goblet of Fire"
    },
    {
        "text": "We’ve all got both light and dark inside us. What matters is the part we choose to act on. That’s who we really are.",
        "author": "Sirius Black",
        "source": "Harry Potter and the Order of the Phoenix"
    },
    {
        "text": "And now, Harry, let us step out into the night and pursue that flighty temptress, adventure.",
        "author": "Albus Dumbledore",
        "source": "Harry Potter and the Half-Blood Prince"
    },
    {
        "text": "It’s a dangerous business, Frodo, going out your door. You step onto the road, and if you don’t keep your feet, there’s no knowing where you might be swept off to.",
        "author": "Bilbo Baggins",
        "source": "The Fellowship of the Ring"
    },
    {
        "text": "Many that live deserve death. And some that die deserve life. Can you give it to them? Then do not be too eager to deal out death in judgement. For even the very wise cannot see all ends.",
        "author": "Gandalf",
        "source": "The Fellowship of the Ring"
    },
    {
        "text": "A wizard is never late, Frodo Baggins. Nor is he early. He arrives precisely when he means to.",
        "author": "Gandalf",
        "source": "The Fellowship of the Ring"
    },
    {
        "text": "Even the smallest person can change the course of the future.",
        "author": "Galadriel",
        "source": "The Fellowship of the Ring"
    },
    {
        "text": "Moonlight drowns out all but the brightest stars.",
        "author": "J.R.R. Tolkien"
    },
    {
        "text": "All that is gold does not glitter, not all those who wander are lost; The old that is strong does not wither, deep roots are not reached by the frost.",
        "author": "J.R.R. Tolkien",
        "source": "The Fellowship of the Ring"
    },
    {
        "text": "Don’t adventures ever have an end? I suppose not. Someone else always has to carry on the story.",
        "author": "Bilbo Baggins",
        "source": "The Fellowship of the Ring"
    },
    {
        "text": "He that breaks a thing to find out what it is has left the path of wisdom.",
        "author": "Gandalf",
        "source": "The Fellowship of the Ring"
    },
    {
        "text": "Only a small part is played in great deeds by any hero.",
        "author": "Gandalf",
        "source": "The Fellowship of the Ring"
    },
    {
        "text": "Faithless is he that says farewell when the road darkens.",
        "author": "Gimli",
        "source": "The Fellowship of the Ring"
    },
    {
        "text": "It’s the job that’s never started as takes longest to finish.",
        "author": "Samwise Gamgee",
        "source": "The Fellowship of the Ring"
    },
    {
        "text": "Despair is only for those who see the end beyond all doubt. We do not.",
        "author": "Gandalf",
        "source": "The Fellowship of the Ring"
    },
    {
        "text": "All we have to decide is what to do with the time that is given us.",
        "author": "Gandalf",
        "source": "The Fellowship of the Ring"
    },
    {
        "text": "Deeds will not be less valiant because they were unpraised.",
        "author": "Aragorn",
        "source": "The Two Towers"
    },
    {
        "text": "The wise speak only of what they know.",
        "author": "Gandalf",
        "source": "The Two Towers"
    },
    {
        "text": "None knows what the new day shall bring him.",
        "author": "Aragorn",
        "source": "The Two Towers"
    },
    {
        "text": "The treacherous are ever distrustful.",
        "author": "Gandalf",
        "source": "The Two Towers"
    },
    {
        "text": "The best time to plant a tree was 20 years ago. The second best time is now.",
        "author": "Chinese Proverb"
    },
    {
        "text": "There is only one way to avoid criticism: do nothing, say nothing, and be nothing.",
        "author": "Aristotle"
    },
    {
        "text": "Some people die at 25 and aren’t buried until 75.",
        "author": "Benjamin Franklin"
    },
    {
        "text": "Flying is learning how to throw yourself at the ground and miss.",
        "author": "Douglas Adams"
    },
    {
        "text": "A computer once beat me in chess. But it was no match for me at kick-boxing.",
        "author": "Emo Philips"
    },
    {
        "text": "Two possibilities exist: Either we are alone in the universe or we are not. Both are equally terrifying.",
        "author": "Arthur C. Clark"
    },
    {
        "text": "Of all sad words of mouth or pen, the saddest are these: it might have been.",
        "author": "John Greenleaf Whittier"
    },
    {
        "text": "I fear not the man who has practised 10,000 kicks, but I do fear the man who has practised one kick 10,000 times.",
        "author": "Bruce Lee"
    },
    {
        "text": "Don’t let schooling interfere with your education.",
        "author": "Mark Twain"
    },
    {
        "text": "Be kind, for everyone you meet is fighting a hard battle.",
        "author": "Plato"
    },
    {
        "text": "Have I not destroyed my enemy when I have made him into my friend?",
        "author": "Abraham Lincoln"
    },
    {
        "text": "If you want to build a ship, don’t drum up the men to gather wood, divide the work and give orders. Instead, teach them to yearn for the vast and endless sea.",
        "author": "Antoine de Saint-Exupery"
    },
    {
        "text": "Do the difficult things while they are easy and do the great things while they are small. A journey of a thousand miles must begin with a single step.",
        "author": "Lao Tzu"
    },
    {
        "text": "Never give up on a dream just because of the time it will take to accomplish it. The time will pass anyway.",
        "author": "Earl Nightingale"
    },
    {
        "text": "Success is walking from failure to failure with no loss of enthusiasm.",
        "author": "Winston Churchill"
    },
    {
        "text": "Try not to become a person of success, but rather try to become a person of value.",
        "author": "Albert Einstein"
    },
    {
        "text": "It is not the strongest of the species that survive, nor the most intelligent, but the one most responsive to change.",
        "author": "Charles Darwin"
    },
    {
        "text": "Live as if you were to die tomorrow. Learn as if you were to live forever.",
        "author": "Mahatma Gandhi"
    },
    {
        "text": "The difference between winning and losing is most often not quitting.",
        "author": "Walt Disney"
    },
    {
        "text": "I find that the harder I work, the more luck I seem to have.",
        "author": "Thomas Jefferson"
    },
    {
        "text": "Only put off until tomorrow what you are willing to die having left undone.",
        "author": "Pablo Picasso"
    },
    {
        "text": "Successful people do what unsuccessful people are not willing to do. Don’t wish it were easier; wish you were better.",
        "author": "Jim Rohn"
    },
    {
        "text": "Many of life’s failures are people who did not realize how close they were to success when they gave up.",
        "author": "Thomas Edison"
    },
    {
        "text": "Stories are light. Light is precious in a world so dark. Begin at the beginning. Tell Gregory a story. Make some light.",
        "author": "Gregory",
        "source": "The Tales of Despereaux"
    },
    {
        "text": "If at first you don’t succeed, reload.",
        "author": "The Bounty Hunter",
        "source": "Star Wars: The Old Republic"
    },
    {
        "text": "Last words are for fools who haven’t said enough.",
        "author": "Last Words of Karl Marx"
    },
    {
        "text": "I have experience. And patience. A man can do anything if he has those.",
        "author": "Helmut Zemo",
        "source": "Captain America: Civil War"
    },
    {
        "text": "Just because something works, doesn’t mean it can’t be improved.",
        "author": "Shuri",
        "source": "Black Panther"
    },
    {
        "text": "Sometimes you have to run before you can walk.",
        "author": "Tony Stark",
        "source": "Iron Man"
    },
    {
        "text": "No amount of money ever bought a second of time.",
        "author": "Tony Stark",
        "source": "Avengers Endgame"
    },
    {
        "text": "Act as if what you do makes a difference. It does.",
        "author": "William James"
    },
    {
        "text": "Success is not final, failure is not fatal: it is the courage to continue that counts.",
        "author": "Winston Churchill"
    },
    {
        "text": "What you get by achieving your goals is not as important as what you become by achieving your goals.",
        "author": "Zig Ziglar"
    },
    {
        "text": "Believe you can and you’re halfway there.",
        "author": "Theodore Roosevelt"
    },
    {
        "text": "When you have a dream, you’ve got to grab it and never let go.",
        "author": "Carol Burnett"
    },
    {
        "text": "If I cannot do great things, I can do small things in a great way.",
        "author": "Martin Luther King Jr."
    },
    {
        "text": "He who sacrifices his conscience to ambition burns a picture to obtain the ashes.",
        "author": "Chinese Proverb"
    },
    {
        "text": "The temptation to quit will be greatest just before you are about to succeed.",
        "author": "Chinese Proverb"
    },
    {
        "text": "Pearls don’t lie on the seashore. If you want one, you must dive for it.",
        "author": "Chinese Proverb"
    },
    {
        "text": "Powerful avalanches begin with small shifts.",
        "author": "Pamela McFarland Walsh"
    },
    {
        "text": "In carnage, I bloom, like a flower in the dawn.",
        "author": "Jhin, the Virtuoso",
        "source": "League of Legends"
    },
    {
        "text": "This stage is beneath my talent, but I shall elevate it.",
        "author": "Jhin, the Virtuoso",
        "source": "League of Legends"
    },
    {
        "text": "And now, the curtain rises.",
        "author": "Jhin, the Virtuoso",
        "source": "League of Legends"
    },
    {
        "text": "Art is worth the pain.",
        "author": "Jhin, the Virtuoso",
        "source": "League of Legends"
    },
    {
        "text": "There is no drama in a peaceful death!",
        "author": "Jhin, the Virtuoso",
        "source": "League of Legends"
    },
    {
        "text": "Art requires a certain cruelty.",
        "author": "Jhin, the Virtuoso",
        "source": "League of Legends"
    },
    {
        "text": "My theater is the mind.",
        "author": "Jhin, the Virtuoso",
        "source": "League of Legends"
    },
    {
        "text": "I swear each performance is the last, but I lie every time.",
        "author": "Jhin, the Virtuoso",
        "source": "League of Legends"
    },
    {
        "text": "Smile! Everyone is watching!",
        "author": "Jhin, the Virtuoso",
        "source": "League of Legends"
    },
    {
        "text": "The show never ends!",
        "author": "Jhin, the Virtuoso",
        "source": "League of Legends"
    },
    {
        "text": "Perfection isn’t good enough.",
        "author": "Jhin, the Virtuoso",
        "source": "League of Legends"
    },
    {
        "text": "Each bullet is a piece of my soul. Each shot is a piece of me.",
        "author": "Jhin, the Virtuoso",
        "source": "League of Legends"
    },
    {
        "text": "It is by my will alone I set my mind in motion.",
        "author": "Jhin, the Virtuoso",
        "source": "League of Legends"
    },
    {
        "text": "They’re going to live, until they die!",
        "author": "Jhin, the Virtuoso",
        "source": "League of Legends"
    },
    {
        "text": "Which is the lie? The mask? Or my face?",
        "author": "Jhin, the Virtuoso",
        "source": "League of Legends"
    },
    {
        "text": "My work asks questions, it never has answers.",
        "author": "Jhin, the Virtuoso",
        "source": "League of Legends"
    },
    {
        "text": "I do what others will not. That alone is innovation.",
        "author": "Jhin, the Virtuoso",
        "source": "League of Legends"
    },
    {
        "text": "Prepare... for your finale.",
        "author": "Jhin, the Virtuoso",
        "source": "League of Legends"
    },
    {
        "text": "I have risen from the filth and muck. I am the lotus blossom. I am beauty.",
        "author": "Jhin, the Virtuoso",
        "source": "League of Legends"
    },
    {
        "text": "The trigger on a loaded weapon, it whispers for us to act.",
        "author": "Jhin, the Virtuoso",
        "source": "League of Legends"
    },
    {
        "text": "I get nervous before every performance, but I need that feeling!",
        "author": "Jhin, the Virtuoso",
        "source": "League of Legends"
    },
    {
        "text": "Ok.",
        "author": "Rammus, the Armordillo",
        "source": "League of Legends"
    },
    {
        "text": "The darker the night, the brighter the stars.",
        "author": "Braum, the Heart of the Freljord",
        "source": "League of Legends"
    },
    {
        "text": "Live each day as if it’s your first.",
        "author": "Ivern, the Green Father",
        "source": "League of Legends"
    },
    {
        "text": "It’s reassuring how alone we aren’t.",
        "author": "Ivern, the Green Father",
        "source": "League of Legends"
    },
    {
        "text": "I find that the stranger life gets, the more it seems to make sense.",
        "author": "Ivern, the Green Father",
        "source": "League of Legends"
    },
    {
        "text": "Laugh like a hyena, and friends will gallop to your side.",
        "author": "Ivern, the Green Father",
        "source": "League of Legends"
    },
    {
        "text": "Animals have more to offer than warm pelts and meat.",
        "author": "Ivern, the Green Father",
        "source": "League of Legends"
    },
    {
        "text": "If life hasn’t changed you, you have failed!",
        "author": "Camille, the Steel Shadow",
        "source": "League of Legends"
    },
    {
        "text": "Do nothing if you wish to be nothing.",
        "author": "Camille, the Steel Shadow",
        "source": "League of Legends"
    },
    {
        "text": "Precision is the difference between a butcher and a surgeon.",
        "author": "Camille, the Steel Shadow",
        "source": "League of Legends"
    },
    {
        "text": "Either attack or run, your indecision is repulsive.",
        "author": "Camille, the Steel Shadow",
        "source": "League of Legends"
    },
    {
        "text": "Regret is what tempers the steel of our soul.",
        "author": "Camille, the Steel Shadow",
        "source": "League of Legends"
    },
    {
        "text": "The right word cuts more deeply than a knife.",
        "author": "Camille, the Steel Shadow",
        "source": "League of Legends"
    },
    {
        "text": "It’s not lies that cut but the sharpness of the truth.",
        "author": "Camille, the Steel Shadow",
        "source": "League of Legends"
    },
    {
        "text": "Patience is what separates good hunters from dead ones.",
        "author": "Camille, the Steel Shadow",
        "source": "League of Legends"
    },
    {
        "text": "The future favors the versatile.",
        "author": "Camille, the Steel Shadow",
        "source": "League of Legends"
    },
    {
        "text": "Those who run from death... stood still in life.",
        "author": "Kindred, the Eternal Hunters",
        "source": "League of Legends"
    },
    {
        "text": "Beauty fades. That is why it is beautiful.",
        "author": "Kindred, the Eternal Hunters",
        "source": "League of Legends"
    },
    {
        "text": "Tomorrow is a hope, never a promise.",
        "author": "Kindred, the Eternal Hunters",
        "source": "League of Legends"
    },
    {
        "text": "DEMACIA!",
        "author": "Garen, the Might of Demacia",
        "source": "League of Legends"
    },
    {
        "text": "It’s not how much time you have, it’s how you use it.",
        "author": "Ekko, the Boy Who Shattered Time",
        "source": "League of Legends"
    },
    {
        "text": "I’d rather make mistakes rather than nothing at all.",
        "author": "Ekko, the Boy Who Shattered Time",
        "source": "League of Legends"
    },
    {
        "text": "This is how a yordle rolls!",
        "author": "Super Galaxy Rumble",
        "source": "League of Legends"
    },
    {
        "text": "I’m not big on sermons - broken bones teach better lessons.",
        "author": "Illaoi, the Kraken Priestess",
        "source": "League of Legends"
    },
    {
        "text": "Life is too short for fear.",
        "author": "Illaoi, the Kraken Priestess",
        "source": "League of Legends"
    },
    {
        "text": "To die is to drown - so I will swim well, till I can swim no more.",
        "author": "Illaoi, the Kraken Priestess",
        "source": "League of Legends"
    },
    {
        "text": "To live... is to fight.",
        "author": "Illaoi, the Kraken Priestess",
        "source": "League of Legends"
    },
    {
        "text": "Wisdom is frequently a kick in the head.",
        "author": "Illaoi, the Kraken Priestess",
        "source": "League of Legends"
    },
    {
        "text": "The waves will drag you down, unless you fight to shore.",
        "author": "Illaoi, the Kraken Priestess",
        "source": "League of Legends"
    },
    {
        "text": "Without change, something sleeps inside us, and seldom awakens.",
        "author": "Illaoi, the Kraken Priestess",
        "source": "League of Legends"
    },
    {
        "text": "Ah, everyone has a plan, until they get punched in the face.",
        "author": "Illaoi, the Kraken Priestess",
        "source": "League of Legends"
    },
    {
        "text": "It is terrible to be satisfied. The world needs us to chase dreams.",
        "author": "Illaoi, the Kraken Priestess",
        "source": "League of Legends"
    },
    {
        "text": "We are born knowing what to do. We must only act.",
        "author": "Illaoi, the Kraken Priestess",
        "source": "League of Legends"
    },
    {
        "text": "Boop.",
        "author": "Aurelion Sol, the Star Forger",
        "source": "League of Legends"
    },
    {
        "text": "Galaxies exist by my will - but, yes, that is certainly an impressive sword.",
        "author": "Aurelion Sol, the Star Forger",
        "source": "League of Legends"
    },
    {
        "text": "The brightest stars shine on long after they’re gone.",
        "author": "Aurelion Sol, the Star Forger",
        "source": "League of Legends"
    },
    {
        "text": "When lost in utter darkness, there is nothing left but forward.",
        "author": "Nautilus, the Titan of the Depths",
        "source": "League of Legends"
    },
    {
        "text": "Tradition is the corpse of wisdom.",
        "author": "Zed, the Master of Shadows",
        "source": "League of Legends"
    },
    {
        "text": "Balance is a fool’s master.",
        "author": "Zed, the Master of Shadows",
        "source": "League of Legends"
    },
    {
        "text": "Do not fear the shrouded path.",
        "author": "Zed, the Master of Shadows",
        "source": "League of Legends"
    },
    {
        "text": "Call me king, call me demon, water forgets the names of the drowned.",
        "author": "Tahm Kench, the River King",
        "source": "League of Legends"
    },
    {
        "text": "Nobody expects the banana.",
        "author": "Soraka, the Starchild",
        "source": "League of Legends"
    },
    {
        "text": "Pain is temporary, victory is forever!",
        "author": "Aatrox, the Darkin Blade",
        "source": "League of Legends"
    },
    {
        "text": "Keep your eyes on the horizon and your feet on the ground.",
        "author": "Taliyah, the Stoneweaver",
        "source": "League of Legends"
    },
    {
        "text": "Hey you, you’re finally awake. You were trying to cross the border right?",
        "author": "Ralof",
        "source": "Skyrim"
    },
    {
        "text": "You have committed crimes against Skyrim and her people. What say you in your defense?",
        "author": "Guard",
        "source": "Skyrim"
    },
    {
        "text": "Oh, hi. So, how are you holding up? Because I’m a potato!",
        "author": "GLaDOS",
        "source": "Portal 2"
    },
    {
        "text": "Science isn’t about WHY, it’s about WHY NOT!",
        "author": "Cave Johnson",
        "source": "Portal 2"
    },
    {
        "text": "It’s a funny thing, ambition. It can take one to sublime heights or harrowing depths. And sometimes they are one and the same.",
        "author": "Emily Kaldwin",
        "source": "Dishonored"
    },
    {
        "text": "It may comfort you to know that your death, while astonishingly violent, will likely be mercifully swift.",
        "author": "AIDAN",
        "source": "Gemina"
    },
    {
        "text": "The die is cast. But today we will shake the table upon which it lands.",
        "author": "AIDAN",
        "source": "Obsidio"
    },
    {
        "text": "The beauty of the universe is in the grandest and smallest things.",
        "author": "AIDAN",
        "source": "Obsidio"
    },
    {
        "text": "The universe was here before you, and it will go on after you. The only way it will remember you is if you do something worthy of remembrance.",
        "author": "AIDAN",
        "source": "Illuminae"
    },
    {
        "text": "A person often meets his destiny on the road he took to avoid it.",
        "author": "Jean de La Fontaine"
    },
    {
        "text": "Life before death. Strength before weakness. Journey before destination.",
        "author": "The Immortal Words",
        "source": "The Stormlight Archive"
    },
    {
        "text": "I’m just an ordinary girl. An ordinary girl with an infinite supply of death quills.",
        "author": "Xayah, the Rebel",
        "source": "League of Legends"
    },
    {
        "text": "Nature bends towards chaos. Give in, or break.",
        "author": "Xayah, the Rebel",
        "source": "League of Legends"
    },
    {
        "text": "Victors are the sole authors of history. Time to write our chapter.",
        "author": "Xayah, the Rebel",
        "source": "League of Legends"
    },
    {
        "text": "Magic is in the heart. Magic is in the rhythm.",
        "author": "Rakan, the Charmer",
        "source": "League of Legends"
    },
    {
        "text": "Magic is supposed to be scary. Love is supposed to hurt. Ecstasy needs a little fear.",
        "author": "Rakan, the Charmer",
        "source": "League of Legends"
    },
    {
        "text": "Humans think that to believe in something, you have to be serious about it. That’s their problem.",
        "author": "Rakan, the Charmer",
        "source": "League of Legends"
    },
    {
        "text": "You’re only given a little spark of madness. You mustn’t lose it.",
        "author": "Rakan, the Charmer",
        "source": "League of Legends"
    },
    {
        "text": "Death! Ride, ride to ruin and the world’s ending!",
        "author": "Eomer",
        "source": "The Return of the King"
    },
    {
        "text": "If my life is going to mean anything, I have to live it myself.",
        "author": "Sally Jackson",
        "source": "The Lightning Thief"
    },
    {
        "text": "I try not to think. It interferes with being nuts.",
        "author": "Leo Valdez",
        "source": "The Mark of Athena"
    },
    {
        "text": "I’m not crazy. My reality is just different than yours.",
        "author": "The Cheshire Cat",
        "source": "Alice in Wonderland"
    },
    {
        "text": "In game development, the first 90% of a project is a lot easier than the second 90%.",
        "author": "Tim Sweeny"
    },
    {
        "text": "If at first you don’t succeed, then skydiving definitely isn’t for you.",
        "author": "Steven Wright"
    },
    {
        "text": "Don’t take life too seriously! Nobody gets out alive anyway. Smile. Be goofy. Take chances. Have fun. Inspire.",
        "author": "Dawn Gluskin"
    },
    {
        "text": "Those who are able to see beyond the shadows and lies of their culture will never be understood, let alone believed by the masses.",
        "author": "Plato"
    },
    {
        "text": "Tomorrow: (noun) A mystical land where 99% of all human productivity, motivation, and achievement is stored.",
        "author": "Unknown"
    },
    {
        "text": "A fish gets bigger when it gets away.",
        "author": "Japanese Proverb"
    },
    {
        "text": "A joke is often the hole through which truth whistles.",
        "author": "Japanese Proverb"
    },
    {
        "text": "You are never too old to set another goal or to dream a new dream.",
        "author": "C.S. Lewis"
    },
    {
        "text": "Be selective with your battles. Sometimes peace is better than being right.",
        "author": "Unknown"
    },
    {
        "text": "I am a Man of Fortune, and I must seek my Fortune.",
        "author": "Henry Avery",
        "source": "Uncharted 4"
    },
    {
        "text": "What is a man but the sum of his memories? We are the stories we live! The tales we tell ourselves!",
        "author": "Clay Kaczmarek",
        "source": "Assassin’s Creed: Revelations"
    },
    {
        "text": "He that increaseth knowledge increaseth sorrow.",
        "author": "Ecclesiastes 1:18"
    },
    {
        "text": "Edward! In a world without gold, we might have been heroes!",
        "author": "Blackbeard",
        "source": "Assassin’s Creed: Black Flag"
    },
    {
        "text": "My name is Inigo Montoya. You killed my father. Prepare to die!",
        "author": "Inigo Montoya",
        "source": "The Princess Bride"
    },
    {
        "text": "As you wish.",
        "author": "Westley",
        "source": "The Princess Bride"
    },
    {
        "text": "Life is pain, Highness. Anyone who says differently is selling something.",
        "author": "Westley",
        "source": "The Princess Bride"
    },
    {
        "text": "There’s a big difference between mostly dead and all dead. Now, mostly dead is slightly alive.",
        "author": "Miracle Max",
        "source": "The Princess Bride"
    },
    {
        "text": "You’ve got an overdeveloped sense of vengeance. It’s going to get you in trouble one of these days.",
        "author": "Count Rugen",
        "source": "The Princess Bride"
    },
    {
        "text": "It’s just a flesh wound.",
        "author": "The Black Knight",
        "source": "Monty Python and the Holy Grail"
    },
    {
        "text": "Wanting to be someone else is a waste of who you are.",
        "author": "Unknown"
    },
    {
        "text": "Everything in this world is magic, except to the magician.",
        "author": "Dr. Robert Ford",
        "source": "Westworld"
    },
    {
        "text": "Some people choose to see the ugliness in this world. The disarray. I choose to see the beauty. To believe there is an order to our days, a purpose.",
        "author": "Dolores Abernathy",
        "source": "Westworld"
    },
    {
        "text": "Dreams mean everything. They’re the stories we tell ourselves of what could be, who we could become.",
        "author": "Dr. Robert Ford",
        "source": "Westworld"
    },
    {
        "text": "That which is real is irreplaceable.",
        "author": "Dolores Abernathy",
        "source": "Westworld"
    },
    {
        "text": "Time undoes even the mightiest of creatures.",
        "author": "Dolores Abernathy",
        "source": "Westworld"
    },
    {
        "text": "You can’t play God without being acquainted with the Devil.",
        "author": "Dr. Robert Ford",
        "source": "Westworld"
    },
    {
        "text": "The love that binds us is more important than the power we wield.",
        "author": "Sir Mordred",
        "source": "Merlin"
    },
    {
        "text": "Never forget what you are. The rest of the world will not. Wear it like armour, and it can never be used to hurt you.",
        "author": "Tyrion Lannister",
        "source": "Game of Thrones"
    },
    {
        "text": "Night gathers, and now my watch begins.",
        "author": "The Night’s Watch",
        "source": "Game of Thrones"
    },
    {
        "text": "There is only one god, and his name is Death. And there is only one thing we say to Death: ‘not today.’",
        "author": "Syrio Forel",
        "source": "Game of Thrones"
    },
    {
        "text": "Power resides where men believe it resides. It’s a trick; a shadow on the wall.",
        "author": "Varys, The Spider",
        "source": "Game of Thrones"
    },
    {
        "text": "Any man who must say, ‘I am the king,’ is no true king.",
        "author": "Tywin Lannister",
        "source": "Game of Thrones"
    },
    {
        "text": "A mind needs books like a sword needs a whetstone.",
        "author": "Tyrion Lannister",
        "source": "Game of Thrones"
    },
    {
        "text": "When you tear out a man's tongue, you are not proving him a liar. You're only telling the world that you fear what he might say.",
        "author": "Tyrion Lannister",
        "source": "Game of Thrones"
    },
    {
        "text": "Death is so final, while life is full of possibilities.",
        "author": "Tyrion Lannister",
        "source": "Game of Thrones"
    },
    {
        "text": "This is the way.",
        "author": "The Mandalorian Code",
        "source": "The Mandalorian"
    },
    {
        "text": "I have spoken.",
        "author": "Kuiil",
        "source": "The Mandalorian"
    },
    {
        "text": "Hello! This is the part where I kill you.",
        "author": "Wheatley (The Part Where He Kills You)",
        "source": "Portal 2"
    },
    {
        "text": "SPAAAAACE!",
        "author": "Space Core",
        "source": "Portal 2"
    },
    {
        "text": "When one chooses to walk the way of the Mandalore, you are both hunter and prey.",
        "author": "The Armorer",
        "source": "The Mandalorian"
    },
    {
        "text": "I'm a Mandalorian. Weapons are part of my religion.",
        "author": "The Mandalorian",
        "source": "The Mandalorian"
    },
    {
        "text": "The universe is big, it's vast and complicated, and ridiculous and sometimes, very rarely, impossible things just happen and we call them miracles.",
        "author": "The Eleventh Doctor",
        "source": "Doctor Who"
    },
    {
        "text": "I am and always will be the optimist. The hoper of far-flung hopes and the dreamer of improbable dreams.",
        "author": "The Eleventh Doctor",
        "source": "Doctor Who"
    },
    {
        "text": "You want weapons? We're in a library! Books! Best weapons in the world!",
        "author": "The Doctor",
        "source": "Doctor Who"
    },
    {
        "text": "The way I see it every life is a pile of good things and bad things. The good things don't always soften the bad things, but vice-versa, the bad things don't necessarily spoil the good things or make them unimportant.",
        "author": "The Doctor",
        "source": "Doctor Who"
    },
    {
        "text": "We're all stories in the end. Just make it a good one, eh?",
        "author": "The Doctor",
        "source": "Doctor Who"
    },
    {
        "text": "Never cruel or cowardly. Never give up, never give in.",
        "author": "The Doctor",
        "source": "Doctor Who"
    },
    {
        "text": "Some people live more in twenty years than others do in eighty. It's not the time that matters, it's the person.",
        "author": "The Doctor",
        "source": "Doctor Who"
    },
    {
        "text": "Letting it get to you. You know what that’s called? Being alive. Best thing there is. Being alive right now is all that counts.",
        "author": "The Third Doctor",
        "source": "Doctor Who"
    },
    {
        "text": "A straight line may be the shortest distance between two points, but it is by no means the most interesting.",
        "author": "The Doctor",
        "source": "Doctor Who"
    },
    {
        "text": "Never ignore coincidence. Unless, of course, you’re busy. In which case, always ignore coincidence.",
        "author": "The Doctor",
        "source": "Doctor Who"
    },
    {
        "text": "Everything’s got to end sometime. Otherwise nothing would ever get started.",
        "author": "The Doctor",
        "source": "Doctor Who"
    },
    {
        "text": "There’s always something to look at if you open your eyes!",
        "author": "The Fifth Doctor",
        "source": "Doctor Who"
    },
    {
        "text": "Never be certain of anything. It’s a sign of weakness.",
        "author": "The Fourth Doctor",
        "source": "Doctor Who"
    },
    {
        "text": "Courage isn’t just a matter of not being frightened, you know. It’s being afraid and doing what you have to do anyway.",
        "author": "The Third Doctor",
        "source": "Doctor Who"
    },
    {
        "text": "Hello! Would you like to destroy some evil today?",
        "author": "Nightblood",
        "source": "Warbreaker"
    },
    {
        "text": "Never trust to general impressions, my boy, but concentrate yourself upon details.",
        "author": "Sherlock Holmes"
    },
    {
        "text": "Any truth is better than indefinite doubt.",
        "author": "Sherlock Holmes"
    },
    {
        "text": "The purpose of a storyteller is not to tell you how to think, but to give you questions to think upon.",
        "author": "The King's Wit",
        "source": "The Way of Kings"
    },
    {
        "text": "Men rarely see their own actions as unjustified.",
        "author": "Kelsier",
        "source": "Mistborn: The Final Empure"
    },
    {
        "text": "Aim for the sun. That way if you miss, at least your arrow will fall far away, and the person it kills will likely be someone you don't know.",
        "author": "The King's Wit",
        "source": "Oathbringer"
    },
    {
        "text": "Sometimes a hypocrite is nothing more than a man in the process of changing.",
        "author": "Dalinar Kholin",
        "source": "Oathbringer"
    },
    {
        "text": "Proper loafing requires company. One man lying about is being idle; two men lying about is a lunch break.",
        "author": "Wayne",
        "source": "Mistborn: Shadows of Self"
    }

];