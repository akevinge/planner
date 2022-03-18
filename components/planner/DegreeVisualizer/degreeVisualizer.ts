import { getPrerequisites } from '../../../modules/planner/';

//I have no idea what the input format will be yet
//probably want to change the background color to indicate completion percent
function visualize(originalSchedule: number[]) {
  if (document.getElementById('degreeVisualization')) {
    document.body.removeChild(document.getElementById('degreeVisualization'));
  }
  const schedule = [...originalSchedule];
  schedule.reverse();
  const courses = {};
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.style.backgroundColor = '#4659A7';
  svg.id = 'degreeVisualization';
  const width = 600;
  const height = 600;
  svg.style.width = width + 'px';
  svg.style.height = height + 'px';
  let count = 0;
  let total = 0;
  schedule.forEach((level) => {
    level.forEach((course) => {
      total += 1;
    });
  });
  schedule.forEach((level) => {
    level.forEach((course) => {
      const coords = logSpiral(count, total);
      const randX = (coords.x * width) / 10;
      const randY = (coords.y * height) / 10;
      count += 1;
      courses[course.name] = generateCircle(randX, randY, course.name, svg);
    });
  });

  schedule.forEach((semester) => {
    semester.forEach((course) => {
      const prereqs = getPrerequisites(course.group); // replace group with uid later
      const nodeCourse = courses[course.name];
      prereqs.forEach((prerequisite) => {
        const nodePrereq = courses[prerequisite.name];
        if (nodePrereq) {
          const end = {
            x: nodeCourse.attributes.cx.nodeValue,
            y: nodeCourse.attributes.cy.nodeValue,
          };
          const start = {
            x: nodePrereq.attributes.cx.nodeValue,
            y: nodePrereq.attributes.cy.nodeValue,
          };
          generateLine(start, end, svg);
        }
      });
    });
  });
  const keys = Object.keys(courses);
  console.log(keys);
  keys.forEach((key) => {
    svg.appendChild(courses[key]);
  });
  //document.body.appendChild(svg);
  console.log(courses);
  console.log(svg.children);
  return svg;
}

//maybe have prereqs become triangles instead of circles
//or it will be polygon with 2 + n sides where n is num of prereqs
//when the user has taken it then it becomes filled in
function generateCircle(posx: number, posy: number, name: string, svg: number) {
  const center = {
    x: Number(svg.style.width.replaceAll('px', '')) / 2,
    y: Number(svg.style.height.replaceAll('px', '')) / 2,
  };
  const svgNS = svg.namespaceURI;
  const CIRCLE_SIZE = 5;
  const x = posx + center.x;
  const y = posy + center.y;

  const circ = document.createElementNS(svgNS, 'circle'); //sets shape
  circ.setAttribute('cx', x); //sets x center
  circ.setAttribute('cy', y); //sets y center
  circ.setAttribute('r', CIRCLE_SIZE); //sets radius
  circ.setAttribute('stroke', '#FFF');
  circ.setAttribute('fill', 'transparent');
  circ.setAttribute('class', 'test');
  circ.name = name;
  //apparently onclick triggers twice. once for down and once for up
  //TODO: make this more of a tooltip style rather than a box
  circ.onmouseup = (event) => {
    if (document.getElementById('daBox')) {
      document.body.removeChild(document.getElementById('daBox'));
    }
    const box = document.createElement('div');
    box.id = 'daBox';
    const courseTitle = document.createElement('h1');
    courseTitle.textContent = name;
    box.appendChild(courseTitle);
    const prereqInfo = [];
    let id;
    nodes.forEach((node) => {
      if (event.target.name === node.name) {
        id = node.group;
      }
    });
    const prereqRaw = getPrerequisites(id);
    prereqRaw.forEach((blob) => {
      const blobby = document.createElement('p');
      blobby.textContent = blob.name;
      prereqInfo.push(blobby);
    });
    prereqInfo.forEach((blob) => {
      box.appendChild(blob);
    });
    document.onmousedown = () => {
      if (document.getElementById('daBox')) {
        console.log(document.getElementById('daBox'));
        document.body.removeChild(document.getElementById('daBox'));
        console.log('closed');
      }
    };
    document.body.appendChild(box);
  };

  circ.onmouseover = (event) => {
    const label = document.createElementNS(svgNS, 'text');
    label.textContent = event.target.name;
    label.id = event.target.name;
    label.setAttribute('stroke', 'white');
    label.setAttribute('fill', 'white');
    label.setAttribute('x', x + CIRCLE_SIZE); //sets x center
    label.setAttribute('y', y + CIRCLE_SIZE); //sets y center

    svg.appendChild(label);
  };
  circ.onmouseout = (event) => {
    svg.removeChild(document.getElementById(event.target.name));
  };

  svg.appendChild(circ);
  return circ;
}

function logSpiral(num: number, total: number) {
  const x = Math.log(num + 1) * Math.cos((num / total) * 2 * Math.PI);
  const y = Math.log(num + 1) * Math.sin((num / total) * 2 * Math.PI);
  return { x: x, y: y };
}
//starting is object with x and y
//ending is object with x and y
//creates line between the two
function generateLine(starting: number, ending: number, svg: number) {
  const svgNS = svg.namespaceURI;
  const line = document.createElementNS(svgNS, 'line');
  const poly = document.createElementNS(svgNS, 'polygon');
  const length = 10;
  const slope = (ending.y - starting.y) / (ending.x - starting.x);
  const angle = Math.atan(slope);
  let factor = 1;
  line.setAttribute('x1', starting.x);
  line.setAttribute('y1', starting.y);
  line.setAttribute('x2', ending.x);
  line.setAttribute('y2', ending.y);
  line.setAttribute('stroke', '#bbb');

  if (ending.x - starting.x > 0) {
    factor *= -1;
  }

  const angle1x = length * Math.cos(angle + Math.PI / 8) * factor + Number(ending.x);
  const angle2x = length * Math.cos(angle - Math.PI / 8) * factor + Number(ending.x);
  const angle1y = length * Math.sin(angle + Math.PI / 8) * factor + Number(ending.y);
  const angle2y = length * Math.sin(angle - Math.PI / 8) * factor + Number(ending.y);
  const angle1 = angle1x + ',' + angle1y;
  const angle2 = angle2x + ',' + angle2y;
  poly.setAttribute('points', ending.x + ',' + ending.y + ' ' + angle1 + ' ' + angle2);
  poly.setAttribute('fill', '#bbb');

  svg.append(line);
  svg.append(poly);
}
