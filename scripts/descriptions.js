export { DEFENDER, BLACKOUT, GENERICRPG, CAVERNS, VR, EDREAMS };


// project descriptions
const DEFENDER = `Moonbase Defender is a browser based game made using JS and the Phaser Engine. 
It's a simple tower-defense game that runs in the browser, primarily influenced by the Bloons and PvZ series. As the player, you have to defend your base from waves of enemies by placing different objects around your base, each of which has an associated cost - to generate these you need to make sure to place solar panels at spots in the base.
Each of the turrets can be destroyed after being attacked by an enemy enough, so as part of the gameplay, you'll need to reinforce your defences with shield generators. How effectively you fill in the base will affect your chances of surviving the invasion.

During the development of this project, I had to make heavy use of JS's OOP options, including the protection modifiers, so for this to be playable, your browser needs to support ECMAScript 6. Also, something that I ended up fairly happy with from this project was the custom GUI system - at the time, I wasn't properly aware of beiong able to overlay html elements on the Phaser game canvas, 
so I ended up creating several custom GUi widgets for buttons and labels to display to the user. These can be found in the gui.js file under the game's scripts. Like with another project, the game board was blocked out and exported as a CSV, which was then brought into a list (see levels.js). One other somewhat significant aspect other than the levels and buildables was the behaviour of the enemies - this was modelled using a faily swimple decision tree, which was used to determine how the enemy ships would target the parts of the base.

The project is embedded here just below, as well as a link to the source code.`;

const BLACKOUT = `Blackout is an interactive choose-your-adventure story I made as part of a team of 4. This was built using a tool called Twine, and can be played in the browser.
We made this game to study & apply narrative structures, such as the Hero's Journey, within a game context, whilst still providing some choice to the player. As part of this, each of us took up a different narrative branch to design - I primarily worked on the power plant section and office break-in section.
Due to the nature of Twine, there wasn't really much technical involvment, as this was done moreso to study narrative design - at most it was some macros to define variables so we could determine which ending the player should end up at.`;

const GENERICRPG = `A Generic Fantasy RPG was a group computing project, primarily done as an excercise in project management & software delivery in a team. As part of this, we had to create a dedicated Kanban board to manage our requirements & track progress on various features of a product (in our case a game). Within our group, the most major feature I worked on was arguably the encounters & combat system, given this made up a major part of the gameplay loop. `;

const CAVERNS = `Caverns of Phobos is a simple auto-scrolling 2D shooter game, written in C++. Unlike some of my other projects, 
this one was built at a lower level, as the sole library it uses is SDL2 (the Simple Direct media Layer). During the development, this ended up being something of a double-edged sword, as I had a lot more control over the game's architecure, but at the same time, the project demanded more from me to define this, though this was helped a little as we were given a starting codebase to build off of.
Given C++'s nature as a default unmanaged language, I did also have to take more care with this - whilst C++ does have smart pointers to make this much easier, at the time of development, I was very new to the language, and so only familiar with raw pointers, which is definitely something to consider for future SDL projects. Some other tweaks I would also make would be in relation to level loading - the game's levels are actually hard-coded into 2D arrays (as these naturally resemble a grid structure).#
Whilst this is serviceable for a smaller project like this, it does mean it is harder to add new stages, though I do see a means to do this - when the levels were created, they were initially in .csv files, which was then pasted into an array - the change I would make within the implementation would be that the levels are loaded from external files, which could also help speed up iteration as changes to levels wouldn't recquire the project to be recompiled.

With that said, there were also multiple aspects of this project that I was ultimately pretty happy with, such as the asteroids that divide themselves into smaller chunks when hit and the shot charging system. If you wish to try the game yourself, I've included a debug build for Windows machines.`;

const VR = `Another group software project I worked on was a VR simulation of the Brighton Dome, specifically in the Corn Exchange area of the building, and the demo here was made by one of our group's artists / programmers.
As part of this, our team had to simulate the movement of people through the space, ideally from a set of user groups for a given event. Our group chose the assumed user groups for the family day event that the Dome had ran fairly recently,
being parents, parents with children (potentially with puschairs), and users with mobility aids (e.g wheelchair users.).

For this project we allocated the workflow based on the members of our team - we had three members who acted as programmers, and a three who created the block-out of the space (to clarify, we were a team of 5, one of our artists did also aid in the programming). As one of the team's programmer's, I had to program the AI for the NPCs.
This also had a couple of dependencies such as an in-game clock system (not operating on real time). This was so that when assigning locations for the NPC agents, they could go to these locations on a given schedule. Aside from this, the main other dependency needed was the "Activity Stand", which were objects in the game world that represented the different stalls that were available during the activity day. The activity stand also aded some logic to allow agents to form a queue for a given time before moving to another location after being at the stand.
However, the bulk of my contribution was in the core of the agent behaviour, which was designed via a behaviour tree that was converted into different parts of a C# script that I attached to the agent.
Getting the behaviour of the basic agent ultimately became a lot more effort than expected, since there were a myriad of issues that I specifically ran into when developing the NPC agents, which led to minimal available time to expand on them to cover our desired user groups.

The link below will take you to the project's repository, which also has a Windows build compatible with the Meta Quest 2 Headset`;

const EDREAMS = `This is Euclidean Dreams, it's a prototype for a puzzle game about switching between 2D and 3D to traverse a level, which I made for my dissertation project. Including the pre-prod stage, this project lasted for the whole of my final academic
year at the University of Brighton. The idea to make a game about a concept like this came from two main sources: Super Paper Mario (2007), a platformer with such a mechanic (from a single angle), and MC Escher's Waterfall (1961). When playing SPM, I had found it odd that switching between 2D and 3D had always been at a single angle, and I wanted to see how you might implement such a system to work with multiple angles.

The core gameplay loop focuses around taking the player character (represented by the alien), and regularly switching between perspectives to help them reach the level's goal post. 
Each stage beyond the tutorial also introduced mechanics that interacted with the perspective-switching system, such as platforms that could only be traversed when in 2D, or rails that get connected to each other in 2D.

Whilst this gameplay mechanic was the main focus of the project, I also wanted to use it to learn some of the other parts of Unity's API that can be used in other projects, such as the JSON serialiser for creating save files, and the new input system's 
mechanisms for changing controller mappings at runtime. This did have some success - I was able to create a game save system with multiple save slots (and operations to create/copy/delete saves), as well as basic control remapping.

If you're curious to see the source code, it's publicly available (see the GitHub link below), which also has a build for Windows.`;