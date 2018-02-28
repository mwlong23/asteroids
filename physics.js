//Physics Helpers
export function constrainInSpace(entity, space){
  if(entity.pos.x < 0){ entity.pos.x = space.width};
  if(entity.pos.y < 0){ entity.pos.y = space.height}
  if(entity.pos.x > space.width){ entity.pos.x = 0}
  if(entity.pos.y > space.height){ entity.pos.y = 0}
}
export function advancePos(entity){
  entity.pos.y += entity.vel.dy;
  entity.pos.x += entity.vel.dx;
};

export function applyDrag(entity){
  entity.vel.dx *= 0.99;
  entity.vel.dy *= 0.99;
};

// export { constrainInSpace, advancePos, applyDrag };