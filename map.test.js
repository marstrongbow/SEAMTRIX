import test from 'node:test';
import assert from 'node:assert/strict';
import {MEXICO_MAP,MAP_SOURCE} from '../mexico-map.js';
import {STATES} from '../model.js';
test('la geometría cubre las 32 entidades sin duplicados y distingue CDMX de México',()=>{
 assert.equal(MEXICO_MAP.length,32);
 assert.deepEqual(MEXICO_MAP.map(x=>x.id),STATES.map(x=>x[0]));
 assert.notEqual(MEXICO_MAP.find(x=>x.id==='09').d,MEXICO_MAP.find(x=>x.id==='15').d);
 for(const s of MEXICO_MAP){assert.ok(s.d.startsWith('M')&&s.d.endsWith('Z'));assert.ok(s.area>0);assert.ok(s.x>=0&&s.x<=800&&s.y>=0&&s.y<=490);}
 assert.equal(MAP_SOURCE.boundaryID,'MEX-ADM1-31927357');
});
