# Computer-Graphics
## Pacman Game:
![pwxlro72](https://github.com/Knight-Night-666/Computer-Graphics/assets/75562252/bcdde669-5426-4303-aae3-497904d8763d)


The above image is my GLSL implementation of the classic pacman game. 
For more details, refer the report at [Pacman Report](Pacman(WebGL)/IMT2020052_report.pdf)

## 3D Model Manipulation:
This project involves simulating a game played on a regular n-sided polygon-shaped 
playground, where m players are placed on different corners. One of the players is designated as 
the catcher and can move to any other corner in a straight line. Each corner can accommodate 
only one player, so if the catcher moves to a corner with an occupied player, that player must 
move to an unoccupied corner. The movement of players is illustrated through k steps taken on 
user command, and the game can be viewed from various camera angles in a graphics window.
For more details refer to the report [here](3D_Model_Manipulation/CG_Report.pdf).

Instructions to run:

```$ npm install $```

```$ npx vite $```

```Open the localhost link that shows up in the terminal.```

## Custom Lighting Shaders:
I have implemented the following shading models from scratch using just GLSL (without any third party libraries like Three.Js):
- Phong Model
- Blinn Phong Model
- Gourad Shader
  
![Screenshot 2023-07-07 002353](https://github.com/Knight-Night-666/Computer-Graphics/assets/75562252/fa1a6957-1cb6-4c77-8241-b82d53726edf)
![Screenshot 2023-07-07 002334](https://github.com/Knight-Night-666/Computer-Graphics/assets/75562252/9687e081-2772-4697-b881-6d5beb691cbb)
![Screenshot 2023-07-07 002250](https://github.com/Knight-Night-666/Computer-Graphics/assets/75562252/85fd818f-e764-4e85-ac9e-b7199a723f53)

The images above show how the phong, blinn phong and Gourad shaders appear to be.

Instructions to run:

```$ npm install $```

```$ npx vite $```

```Open the localhost link that shows up in the terminal.```


## Pendulum Virtual Sandbox:

- Pendulums are constructed as scenegraphs, enabling control over their motion and collision detection with other pendulums.
- Animation is achieved through "loophooks" that utilize a transition function to update the state of the animation at each time interval (dt), providing modularity for various animations.
- The physics of the pendulum simulation incorporates a realistic time-varying equation based on the small angle approximation. Users have the ability to manipulate factors such as gravity, maximum displacement from the center, and lighting intensities and positions.
- The lighting system is designed to dynamically follow the movement of the objects in the simulation, ensuring consistent illumination.

  ![Screenshot 2023-07-07 001750](https://github.com/Knight-Night-666/Computer-Graphics/assets/75562252/fc939575-87b2-4d1d-8547-ac5340ed7b4f)


