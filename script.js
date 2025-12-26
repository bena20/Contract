const df = [
  { off:94, offCap:0.16, def:94, defCap:0.20 },
  { off:93, offCap:0.15, def:93, defCap:0.19 },
  { off:92, offCap:0.145, def:92, defCap:0.175 },
  { off:91, offCap:0.14, def:91, defCap:0.16 },
  { off:90, offCap:0.135, def:90, defCap:0.145 },
  { off:89, offCap:0.12, def:89, defCap:0.13 },
  { off:88, offCap:0.105, def:88, defCap:0.115 },
  { off:87, offCap:0.09, def:87, defCap:0.10 },
  { off:86, offCap:0.08, def:86, defCap:0.085 },
  { off:85, offCap:0.07, def:85, defCap:0.07 },
  { off:84, offCap:0.06, def:84, defCap:0.055 },
  { off:83, offCap:0.04, def:83, defCap:0.04 },
  { off:82, offCap:0.032, def:82, defCap:0.028 },
  { off:81, offCap:0.024, def:81, defCap:0.018 },
  { off:80, offCap:0.016, def:80, defCap:0.014 },
  { off:79, offCap:0.013, def:79, defCap:0.012 },
  { off:78, offCap:0.012, def:78, defCap:0.011 },
  { off:77, offCap:0.011, def:77, defCap:0.01 },
  { off:76, offCap:0.01, def:76, defCap:0.009 },
];

function calculate() {
  const off = Number(document.getElementById("off").value);
  const pdef = Number(document.getElementById("pdef").value);
  const oa = Number(document.getElementById("oa").value);
  const age = Number(document.getElementById("age").value);
  const elc = document.getElementById("elc").checked;

  const x_eight = 0.18;
  const cap = 95.5;

  const tw = ((off>85 && pdef>80) || (off>82 && pdef>82)) ? 1 : 0;
  const twoway = pdef < 80 ? tw * 1.025 : tw * 1.05;

  const scg = ((off<65 && pdef>76) || (off<60 && pdef>74)) ? 1 : 0;
  const gnval = scg * (pdef>77 ? 0.85 : 0.55);

  const elcbonus = elc ? 0.9 : 1;
  const oneway = (off>79 && pdef<67) ? 0.85 : 1;

  let allo = 1;
  if (off>92) allo=1.3;
  else if (off>86) allo=1.2;
  else if (off>82) allo=1.1;

  const offVal = df.find(r => r.off === off)?.offCap || 0;
  const defVal = df.find(r => r.def === pdef)?.defCap || 0;
  const oaVal = 0.01;

  const sumAllo = (offVal*allo) + defVal + oaVal;

  let sugval;
  if (off<78 && pdef<70) {
    sugval = 0.8/82.5;
  } else if (twoway>0) {
    sugval = (gnval>0 ? gnval : 1) * (sumAllo/2) * twoway;
  } else {
    sugval = (gnval>0 ? gnval : 1) * (sumAllo/2);
  }

  sugval = Math.min(sugval * oneway * elcbonus, 0.8);

  let aav = Math.min(sugval * cap, x_eight * cap);
  if (age > 34) aav *= 0.9;

  document.getElementById("output").innerHTML = `
    <b>AAV:</b> ${aav.toFixed(6)}<br>
    <b>Salary:</b> $${(aav*1_000_000).toLocaleString()}<br>
    ${elc ? "<i>Max contract length 2–3 years</i>" : ""}
  `;
}
