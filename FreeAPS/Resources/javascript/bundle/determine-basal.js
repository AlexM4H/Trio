var freeaps_determineBasal;(()=>{var e={5546:(e,a,r)=>{var t=r(6880);function o(e,a){a||(a=0);var r=Math.pow(10,a);return Math.round(e*r)/r}function i(e,a){return"mmol/L"===a.out_units?o(e/18,1):Math.round(e)}var n="",s="",l="";function m(e,a){var r=[2,7,12,16,20,50,60,80,90,100,110,150,180,200],t=[0,0,.4,.7,.7,-.5,-.5,-.3,-.2,0,0,.5,.7,.7],o=r.length-1,i=r[0],n=t[0],s=r[o],l=t[o],m=1,d=1,u=1,c=i;if(i>e)m=(d=n)+((l=t[1])-d)/((s=r[1])-(u=i))*(e-u);else if(s<e)m=(d=n=t[o-1])+(l-d)/(s-(u=i=r[o-1]))*(e-u);else for(var g=0;g<=o;g++){if(n=t[g],(i=r[g])==e){m=n;break}if(i>e){m=d+(n-d)/(i-(u=c))*(e-u);break}d=n,c=i}return m*=e>100?a.higher_ISFrange_weight:e>40?a.lower_ISFrange_weight:a.delta_ISFrange_weight}e.exports=function(e,a,r,d,u,c,g,b,p,f){var v={},h=new Date;if(f&&(h=f),void 0===d||void 0===d.current_basal)return v.error="Error: could not get current basal rate",v;var _=t(d.current_basal,d),B=_,M=new Date;f&&(M=f);var x,y=new Date(e.date),S=o((M-y)/60/1e3,1),C=e.glucose,w=e.noise;x=e.delta>-.5?"+"+o(e.delta,0):o(e.delta,0);var G=Math.min(e.delta,e.short_avgdelta),I=Math.min(e.short_avgdelta,e.long_avgdelta),F=Math.max(e.delta,e.short_avgdelta,e.long_avgdelta);(C<=10||38===C||w>=3)&&(v.reason="CGM is calibrating, in ??? state, or noise is high");if(C>60&&0==e.delta&&e.short_avgdelta>-1&&e.short_avgdelta<1&&e.long_avgdelta>-1&&e.long_avgdelta<1&&("fakecgm"==e.device?(console.error("CGM data is unchanged ("+i(C,d)+"+"+i(e.delta,d)+") for 5m w/ "+i(e.short_avgdelta,d)+" mg/dL ~15m change & "+i(e.long_avgdelta,2)+" mg/dL ~45m change"),console.error("Simulator mode detected ("+e.device+"): continuing anyway")):!0),S>12||S<-5?v.reason="If current system time "+M+" is correct, then BG data is too old. The last BG data was read "+S+"m ago at "+y:0===e.short_avgdelta&&0===e.long_avgdelta&&(e.last_cal&&e.last_cal<3?v.reason="CGM was just calibrated":v.reason="CGM data is unchanged ("+i(C,d)+"+"+i(e.delta,d)+") for 5m w/ "+i(e.short_avgdelta,d)+" mg/dL ~15m change & "+i(e.long_avgdelta,d)+" mg/dL ~45m change"),C<=10||38===C||w>=3||S>12||S<-5||0===e.short_avgdelta&&0===e.long_avgdelta)return a.rate>=B?(v.reason+=". Canceling high temp basal of "+a.rate,v.deliverAt=h,v.temp="absolute",v.duration=0,v.rate=0,v):0===a.rate&&a.duration>30?(v.reason+=". Shortening "+a.duration+"m long zero temp to 30m. ",v.deliverAt=h,v.temp="absolute",v.duration=30,v.rate=0,v):(v.reason+=". Temp "+a.rate+" <= current basal "+B+"U/hr; doing nothing. ",v);var O,T,A,R=d.max_iob;if(void 0!==d.min_bg&&(T=d.min_bg),void 0!==d.max_bg&&(A=d.max_bg),void 0===d.min_bg||void 0===d.max_bg)return v.error="Error: could not determine target_bg. ",v;O=(d.min_bg+d.max_bg)/2;var U=d.exercise_mode||d.high_temptarget_raises_sensitivity,D=100;if(d.half_basal_exercise_target)var j=d.half_basal_exercise_target;else j=160;if(U&&d.temptargetSet&&O>D||d.low_temptarget_lowers_sensitivity&&d.temptargetSet&&O<D){var q=j-D;q+O-D>0?(sensitivityRatio=q/(q+O-D),sensitivityRatio=Math.min(sensitivityRatio,d.autosens_max),sensitivityRatio=o(sensitivityRatio,2)):sensitivityRatio=d.autosens_max,process.stderr.write("Sensitivity ratio set to "+sensitivityRatio+" based on temp target of "+O+"; ")}else void 0!==u&&u&&(sensitivityRatio=u.ratio,process.stderr.write("Autosens ratio: "+sensitivityRatio+"; "));if(sensitivityRatio&&(B=d.current_basal*sensitivityRatio,(B=t(B,d))!==_?process.stderr.write("Adjusting basal from "+_+" to "+B+"; "):process.stderr.write("Basal unchanged: "+B+"; ")),d.temptargetSet);else if(void 0!==u&&u&&(d.sensitivity_raises_target&&u.ratio<1||d.resistance_lowers_target&&u.ratio>1)){T=o((T-60)/u.ratio)+60,A=o((A-60)/u.ratio)+60;var E=o((O-60)/u.ratio)+60;O===(E=Math.max(80,E))?process.stderr.write("target_bg unchanged: "+E+"; "):process.stderr.write("target_bg from "+O+" to "+E+"; "),O=E}if(e.noise>=2){var P=Math.max(1.1,d.noisyCGMTargetMultiplier),W=(Math.min(250,d.maxRaw),o(Math.min(200,T*P))),k=o(Math.min(200,O*P)),z=o(Math.min(200,A*P));process.stderr.write("Raising target_bg for noisy / raw CGM data, from "+O+" to "+k+"; "),T=W,O=k,A=z}var L=T-.5*(T-40),N=o(d.sens,1),Z=d.sens;if(void 0!==u&&u&&((Z=o(Z=d.sens/sensitivityRatio,1))!==N?process.stderr.write("ISF from "+i(N,d)+" to "+i(Z,d)):process.stderr.write("ISF unchanged: "+i(Z,d)),n+="Autosense, Ratio: "+sensitivityRatio+", ISF: "+i(N,d)+"→"+i(Z,d)),console.error("CR:"+d.carb_ratio),Z=function(e,a,r,t,s,d,u,c){if(!r.use_autoisf)return console.error("autoISF disabled in Preferences"),e;var g=t.autoISF_duration,b=t.autoISF_average,p=t.dura_p,f=t.delta_pl,v=t.delta_pn,h=t.r_squ,_=t.bg_acceleration,B=t.parabola_fit_a0,M=t.parabola_fit_a1,x=t.parabola_fit_a2,y=t.pp_debug;l+="BG-accel: "+o(_,3)+", PF-minutes: "+p+", PF-corr: "+i(h,r)+", PF-nextDelta: "+i(v,r)+", PF-lastDelta: "+i(f,r)+", regular Delta: "+i(t.delta,r),console.error(y+l+" , Weights Accel/Brake: "+r.bgAccel_ISF_weight+" / "+r.bgBrake_ISF_weight),l=", Parabolic Fit, lastΔ: "+i(f,r)+", nextΔ: "+i(v,r)+", regΔ: "+i(t.delta,r);var S=r.autoisf_max,C=!1;if(s.mealCOB>0&&!r.enableautoisf_with_COB)console.error("BG dependant autoISF by-passed; preferences disabled mealCOB of "+o(s.mealCOB,1));else{var w=1,G=1,I=a+10-b,F=1,O=_,T=-M/2/x*5,A=o(B-T*T/25*x,1);(T=o(T,1))<0&&O<0?console.error("Parabolic fit saw maximum of "+A+" about "+-T+" minutes ago"):T<0&&O>0?console.error("Parabolic fit saw minimum of "+A," about "+-T+" minutes ago"):T>0&&O<0?console.error("Parabolic fit predicts maximum of "+A+" in about "+T+"minutes"):T>0&&O>0&&console.error("Parabolic fit predicts minimum of "+A+" in about "+T+" minutes");var R=t.parabola_fit_correlation;if(R<.9)console.error("accel_ISF adaptation by-passed as correlation "+o(R,3)+" is too low");else{var U=1;if(t.glucose<r.target_bg&&O<1&&(U=.5),O<0)var D=r.bgBrake_ISF_weight;else D=r.bgAccel_ISF_weight;F=1+O*U*D,console.error("Calc result for acce_ISF:"+o(F,2)),1!=F&&(C=!0),S<F?console.error("acce_ISF adaptation "+o(F,2)+" limited by autoisf_max = "+S):r.autoisf_min>F?(console.error("acce_ISF adaptation "+o(F,2)+" limited by autoisf_min = "+r.autoisf_min),F=r.autoisf_min):console.error("acce_ISF adaptation is "+o(F,2))}var j=1+m(100-I,r);if(console.error("1. bg_ISF adaptation is "+o(j,2)),S<j&&console.error("bg_ISF adaptation "+o(j,2)+" limited by autoisf_max "+S),j<1)return F>1&&(j*=F,console.error("bg_ISF adaptation lifted to "+o(j,2)+" as bg accelerates already")),j<r.autoisf_min&&console.error("bg_ISF adaptation "+o(j,2)+" limited by autoisf_min "+r.autoisf_min),e=Math.min(720,o(r.sens/Math.max(r.autoisf_min,j),1)),console.error("early Return autoISF:  "+i(e,r)),e;j>1&&(C=!0);var q=t.delta;I>0?console.error("delta_ISF adaptation by-passed as average glucose < "+i(a+10,r)):t.short_avgdelta<0?console.error("delta_ISF adaptation by-passed as no rise or too short lived"):r.enableppisf_always||r.postmeal_ISF_duration>=(d-s.lastCarbTime)/1e3/3600?1!=(w=1+Math.max(0,q*r.postmeal_ISF_weight))&&(C=!0,S<w?console.error("pp_ISF adaptation"+i(w,r)+"limited by autoisf_max",S):console.error("pp_ISF adaptation is"+i(w,r))):(G=m(q,r),I>-20&&(G*=.5),1!=(G=1+G)&&(C=!0,S<G?console.error("delta_ISF adaptation "+i(G,r)+" limited by autoisf_max ",S):console.error("delta_ISF adaptation is "+i(G,r))))}var E=1,P=r.autoisf_hourlychange;s.mealCOB>0&&!r.enableautoisf_with_COB?console.error("autoISF by-passed; preferences disabled mealCOB of "+o(s.mealCOB,1)):g<10?console.error("autoISF by-passed; BG is only "+g+"m at level "+b):b<=a?console.error("autoISF by-passed; avg. glucose "+b+" below target "+i(a,r)):(E+=g/60*(P/a)*(b-a),C=!0,console.error("autoISF reports ISF "+i(e,r)+" did not do it for "+g+"m; go more aggressive by "+o(E,2)),S<E&&console.error("autoISF adaptation "+o(E,2)+" limited by autoisf_max "+S));if(C){var W=Math.max(Math.min(S,Math.max(E,j,G,F,w)),c);F<1&&W>1&&(W*=F,console.error("strongest ISF weakened by factor "+o(F,2)+" as bg decelerates already")),e=o(r.sens/W,1),n+=", autoISF, Ratio: "+o(W,2)+", ISF: "+i(e,r)+l}return console.error("Inside autoISF result "+i(e,r)),e}(Z,O,d,e,c,f,0,sensitivityRatio),void 0===r)return v.error="Error: iob_data undefined. ",v;var $,H=r;if(r.length,r.length>1&&(r=H[0]),void 0===r.activity||void 0===r.iob)return v.error="Error: iob_data missing some property. ",v;var J=(($=void 0!==r.lastTemp?o((new Date(M).getTime()-r.lastTemp.date)/6e4):0)+a.duration)%30;if(console.error("currenttemp:"+a.rate+" lastTempAge:"+$+"m, tempModulus:"+J+"m"),v.temp="absolute",v.deliverAt=h,b&&a&&r.lastTemp&&a.rate!==r.lastTemp.rate&&$>10&&a.duration)return v.reason="Warning: currenttemp rate "+a.rate+" != lastTemp rate "+r.lastTemp.rate+" from pumphistory; canceling temp",g.setTempBasal(0,0,d,v,a);if(a&&r.lastTemp&&a.duration>0){var K=$-r.lastTemp.duration;if(K>5&&$>10)return v.reason="Warning: currenttemp running but lastTemp from pumphistory ended "+K+"m ago; canceling temp",g.setTempBasal(0,0,d,v,a)}var Q=o(-r.activity*Z*5,2),V=o(6*(G-Q));if(V<0&&(V=o(6*(I-Q)))<0&&(V=o(6*(e.long_avgdelta-Q))),r.iob>0)var X=o(C-r.iob*Z);else X=o(C-r.iob*Math.min(Z,d.sens));var Y=X+V;if(void 0===Y||isNaN(Y))return v.error="Error: could not calculate eventualBG. Sensitivity: "+Z+" Deviation: "+V,v;var ee=function(e,a,r){return o(r+(e-a)/24,1)}(O,Y,Q);v={temp:"absolute",bg:C,tick:x,eventualBG:Y,insulinReq:0,reservoir:p,deliverAt:h,sensitivityRatio};var ae=[],re=[],te=[],oe=[];ae.push(C),re.push(C),oe.push(C),te.push(C);var ie=function(e,a,r,t){return a?!e.allowSMB_with_high_temptarget&&e.temptargetSet&&t>100?(console.error("SMB disabled due to high temptarget of",t),!1):!0===r.bwFound&&!1===e.A52_risk_enable?(console.error("SMB disabled due to Bolus Wizard activity in the last 6 hours."),!1):!0===e.enableSMB_always?(r.bwFound?console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled due to enableSMB_always"),!0):!0===e.enableSMB_with_COB&&r.mealCOB?(r.bwCarbs?console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for COB of",r.mealCOB),!0):!0===e.enableSMB_after_carbs&&r.carbs?(r.bwCarbs?console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for 6h after carb entry"),!0):!0===e.enableSMB_with_temptarget&&e.temptargetSet&&t<100?(r.bwFound?console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard"):console.error("SMB enabled for temptarget of",i(t,e)),!0):(console.error("SMB disabled (no enableSMB preferences active or no condition satisfied)"),!1):(console.error("SMB disabled (!microBolusAllowed)"),!1)}(d,b,c,O),ne=d.enableUAM,se=0,le=0;se=o(G-Q,1);var me=o(G-Q,1);csf=Z/d.carb_ratio,console.error("profile.sens:"+i(d.sens,d)+", sens:"+i(Z,d)+", CSF:"+o(csf,1));var de=o(30*csf*5/60,1);se>de&&(console.error("Limiting carb impact from "+se+" to "+de+"mg/dL/5m (30g/h)"),se=de);var ue=3;sensitivityRatio&&(ue/=sensitivityRatio);var ce=ue;if(c.carbs){ue=Math.max(ue,c.mealCOB/20);var ge=o((new Date(M).getTime()-c.lastCarbTime)/6e4),be=(c.carbs-c.mealCOB)/c.carbs;ce=o(ce=ue+1.5*ge/60,1),console.error("Last carbs "+ge+" minutes ago; remainingCATime:"+ce+"hours; "+o(100*be)+"% carbs absorbed")}var pe=Math.max(0,se/5*60*ce/2)/csf,fe=90,ve=1;d.remainingCarbsCap&&(fe=Math.min(90,d.remainingCarbsCap)),d.remainingCarbsFraction&&(ve=Math.min(1,d.remainingCarbsFraction));var he=1-ve,_e=Math.max(0,c.mealCOB-pe-c.carbs*he),Be=(_e=Math.min(fe,_e))*csf*5/60/(ce/2),Me=o(c.slopeFromMaxDeviation,2),xe=o(c.slopeFromMinDeviation,2),ye=Math.min(Me,-xe/3),Se=0;0===se?le=0:!0===d.floating_carbs?(le=Math.min(60*ce/5/2,Math.max(0,c.carbs*csf/se)),Se=Math.min(60*ce/5/2,Math.max(0,c.mealCOB*csf/se)),c.carbs>0&&(n+=", FloatingCarbs: "+o(c.carbs,1),console.error("Floating Carbs CID: "+o(le,1)+" / MealCarbs: "+o(c.carbs,1)+" vs. Not Floating:"+o(Se,1)+" / MealCOB:"+o(c.mealCOB,1)))):le=Math.min(60*ce/5/2,Math.max(0,c.mealCOB*csf/se)),console.error("Carb Impact:"+se+"mg/dL per 5m; CI Duration:"+o(5*le/60*2,1)+"hours; remaining CI ("+ce/2+"h peak):",o(Be,1)+"mg/dL per 5m");var Ce,we,Ge,Ie,Fe,Oe=999,Te=999,Ae=999,Re=C,Ue=999,De=999,je=999,qe=999,Ee=Y,Pe=C,We=C,ke=0,ze=[],Le=[];try{H.forEach((function(e){var a=o(-e.activity*Z*5,2),r=o(-e.iobWithZeroTemp.activity*Z*5,2),t=se*(1-Math.min(1,re.length/12));Ee=re[re.length-1]+a+t;var i=oe[oe.length-1]+r,n=Math.max(0,Math.max(0,se)*(1-ae.length/Math.max(2*le,1))),s=Math.min(ae.length,12*ce-ae.length),l=Math.max(0,s/(ce/2*12)*Be);n+l,ze.push(o(l,0)),Le.push(o(n,0)),COBpredBG=ae[ae.length-1]+a+Math.min(0,t)+n+l;var m=Math.max(0,me+te.length*ye),d=Math.max(0,me*(1-te.length/Math.max(36,1))),u=Math.min(m,d);u>0&&(ke=o(5*(te.length+1)/60,1)),UAMpredBG=te[te.length-1]+a+Math.min(0,t)+u,re.length<48&&re.push(Ee),ae.length<48&&ae.push(COBpredBG),te.length<48&&te.push(UAMpredBG),oe.length<48&&oe.push(i),COBpredBG<Ue&&(Ue=o(COBpredBG)),UAMpredBG<De&&(De=o(UAMpredBG)),Ee<je&&(je=o(Ee)),i<qe&&(qe=o(i));re.length>18&&Ee<Oe&&(Oe=o(Ee)),Ee>Pe&&(Pe=Ee),(le||Be>0)&&ae.length>18&&COBpredBG<Te&&(Te=o(COBpredBG)),(le||Be>0)&&COBpredBG>Pe&&(We=COBpredBG),ne&&te.length>12&&UAMpredBG<Ae&&(Ae=o(UAMpredBG)),ne&&UAMpredBG>Pe&&UAMpredBG}))}catch(e){console.error("Problem with iobArray.  Optional feature Advanced Meal Assist disabled")}c.mealCOB&&(console.error("predCIs (mg/dL/5m):"+Le.join(" ")),console.error("remainingCIs:      "+ze.join(" "))),v.predBGs={},re.forEach((function(e,a,r){r[a]=o(Math.min(401,Math.max(39,e)))}));for(var Ne=re.length-1;Ne>12&&re[Ne-1]===re[Ne];Ne--)re.pop();for(v.predBGs.IOB=re,Ge=o(re[re.length-1]),oe.forEach((function(e,a,r){r[a]=o(Math.min(401,Math.max(39,e)))})),Ne=oe.length-1;Ne>6&&!(oe[Ne-1]>=oe[Ne]||oe[Ne]<=O);Ne--)oe.pop();if(v.predBGs.ZT=oe,o(oe[oe.length-1]),c.mealCOB>0&&(se>0||Be>0)){for(ae.forEach((function(e,a,r){r[a]=o(Math.min(401,Math.max(39,e)))})),Ne=ae.length-1;Ne>12&&ae[Ne-1]===ae[Ne];Ne--)ae.pop();v.predBGs.COB=ae,Ie=o(ae[ae.length-1]),Y=Math.max(Y,o(ae[ae.length-1]))}if(se>0||Be>0){if(ne){for(te.forEach((function(e,a,r){r[a]=o(Math.min(401,Math.max(39,e)))})),Ne=te.length-1;Ne>12&&te[Ne-1]===te[Ne];Ne--)te.pop();v.predBGs.UAM=te,Fe=o(te[te.length-1]),te[te.length-1]&&(Y=Math.max(Y,o(te[te.length-1])))}v.eventualBG=Y}console.error("UAM Impact:"+me+"mg/dL per 5m; UAM Duration:"+ke+"hours"),Oe=Math.max(39,Oe),Te=Math.max(39,Te),Ae=Math.max(39,Ae),Ce=o(Oe);var Ze=c.mealCOB/c.carbs;we=o(Ae<999&&Te<999?(1-Ze)*UAMpredBG+Ze*COBpredBG:Te<999?(Ee+COBpredBG)/2:Ae<999?(Ee+UAMpredBG)/2:Ee),qe>we&&(we=qe),Re=o(Re=le||Be>0?ne?Ze*Ue+(1-Ze)*De:Ue:ne?De:je);var $e=Ae;if(qe<L)$e=(Ae+qe)/2;else if(qe<O){var He=(qe-L)/(O-L);$e=(Ae+(Ae*He+qe*(1-He)))/2}else qe>Ae&&($e=(Ae+qe)/2);if($e=o($e),c.carbs)if(!ne&&Te<999)Ce=o(Math.max(Oe,Te));else if(Te<999){var Je=Ze*Te+(1-Ze)*$e;Ce=o(Math.max(Oe,Te,Je))}else Ce=ne?$e:Re;else ne&&(Ce=o(Math.max(Oe,$e)));Ce=Math.min(Ce,we),process.stderr.write("minPredBG: "+Ce+" minIOBPredBG: "+Oe+" minZTGuardBG: "+qe),Te<999&&process.stderr.write(" minCOBPredBG: "+Te),Ae<999&&process.stderr.write(" minUAMPredBG: "+Ae),console.error(" avgPredBG:"+we+" COB/Carbs:"+c.mealCOB+"/"+c.carbs),We>C&&(Ce=Math.min(Ce,We)),v.COB=c.mealCOB,v.IOB=r.iob,v.BGI=i(Q,d),v.deviation=i(V,d),v.ISF=i(Z,d),v.CR=o(d.carb_ratio,2),v.target_bg=i(O,d),v.reason=n+", Standard, COB: "+v.COB+", Dev: "+v.deviation+", BGI: "+v.BGI+", CR: "+v.CR+", Target: "+v.target_bg+", minPredBG "+i(Ce,d)+", minGuardBG "+i(Re,d)+", IOBpredBG "+i(Ge,d),Ie>0&&(v.reason+=", COBpredBG "+i(Ie,d)),Fe>0&&(v.reason+=", UAMpredBG "+i(Fe,d)),v.reason+="; ";var Ke=X;Ke<40&&(Ke=Math.min(Re,Ke));var Qe,Ve=L-Ke,Xe=240,Ye=240;if(c.mealCOB>0&&(se>0||Be>0)){for(Ne=0;Ne<ae.length;Ne++)if(ae[Ne]<T){Xe=5*Ne;break}for(Ne=0;Ne<ae.length;Ne++)if(ae[Ne]<L){Ye=5*Ne;break}}else{for(Ne=0;Ne<re.length;Ne++)if(re[Ne]<T){Xe=5*Ne;break}for(Ne=0;Ne<re.length;Ne++)if(re[Ne]<L){Ye=5*Ne;break}}ie&&Re<L&&(console.error("minGuardBG "+i(Re,d)+" projected below "+i(L,d)+" - disabling SMB"),ie=!1),void 0===d.maxDelta_bg_threshold&&(Qe=.2),void 0!==d.maxDelta_bg_threshold&&(Qe=Math.min(d.maxDelta_bg_threshold,.3)),F>Qe*C&&(console.error("maxDelta "+i(F,d)+" > "+100*Qe+"% of BG "+i(C,d)+" - disabling SMB"),v.reason+="maxDelta "+i(F,d)+" > "+100*Qe+"% of BG "+i(C,d)+": SMB disabled; ",ie=!1),console.error("BG projected to remain above "+i(T,d)+" for "+Xe+"minutes"),(Ye<240||Xe<60)&&console.error("BG projected to remain above "+i(L,d)+" for "+Ye+"minutes");var ea=Ye,aa=d.current_basal*Z*ea/60,ra=Math.max(0,c.mealCOB-.25*c.carbs),ta=(Ve-aa)/csf-ra;if(aa=o(aa),ta=o(ta),console.error("naive_eventualBG:",X,"bgUndershoot:",Ve,"zeroTempDuration:",ea,"zeroTempEffect:",aa,"carbsReq:",ta),ta>=d.carbsReqThreshold&&Ye<=45&&(v.carbsReq=ta,v.reason+=ta+" add'l carbs req w/in "+Ye+"m; "),C<L&&r.iob<20*-d.current_basal/60&&G>0&&G>ee)v.reason+="IOB "+r.iob+" < "+o(20*-d.current_basal/60,2),v.reason+=" and minDelta "+i(G,d)+" > expectedDelta "+i(ee,d)+"; ";else if(C<L||Re<L){v.reason+="minGuardBG "+i(Re,d)+"<"+i(L,d);var oa=(Ve=O-Re)/Z,ia=o(60*oa/d.current_basal);return ia=30*o(ia/30),ia=Math.min(120,Math.max(30,ia)),g.setTempBasal(0,ia,d,v,a)}if(d.skip_neutral_temps&&v.deliverAt.getMinutes()>=55)return v.reason+="; Canceling temp at "+v.deliverAt.getMinutes()+"m past the hour. ",g.setTempBasal(0,0,d,v,a);if(Y<T){if(v.reason+="Eventual BG "+i(Y,d)+" < "+i(T,d),G>ee&&G>0&&!ta)return X<40?(v.reason+=", naive_eventualBG < 40. ",g.setTempBasal(0,30,d,v,a)):(e.delta>G?v.reason+=", but Delta "+i(x,d)+" > expectedDelta "+i(ee,d):v.reason+=", but Min. Delta "+G.toFixed(2)+" > Exp. Delta "+i(ee,d),a.duration>15&&t(B,d)===t(a.rate,d)?(v.reason+=", temp "+a.rate+" ~ req "+B+"U/hr. ",v):(v.reason+="; setting current basal of "+B+" as temp. ",g.setTempBasal(B,30,d,v,a)));var na=2*Math.min(0,(Y-O)/Z);na=o(na,2);var sa=Math.min(0,(X-O)/Z);if(sa=o(sa,2),G<0&&G>ee)na=o(na*(G/ee),2);var la=B+2*na;la=t(la,d);var ma=a.duration*(a.rate-B)/60;if(ma<Math.min(na,sa)-.3*B)return v.reason+=", "+a.duration+"m@"+a.rate.toFixed(2)+" is a lot less than needed. ",g.setTempBasal(la,30,d,v,a);if(void 0!==a.rate&&a.duration>5&&la>=.8*a.rate)return v.reason+=", temp "+a.rate+" ~< req "+la+"U/hr. ",v;if(la<=0){if((ia=o(60*(oa=(Ve=O-X)/Z)/d.current_basal))<0?ia=0:(ia=30*o(ia/30),ia=Math.min(120,Math.max(0,ia))),ia>0)return v.reason+=", setting "+ia+"m zero temp. ",g.setTempBasal(la,ia,d,v,a)}else v.reason+=", setting "+la+"U/hr. ";return g.setTempBasal(la,30,d,v,a)}if(G<ee&&(!b||!ie))return e.delta<G?v.reason+="Eventual BG "+i(Y,d)+" > "+i(T,d)+" but Delta "+i(x,d)+" < Exp. Delta "+i(ee,d):v.reason+="Eventual BG "+i(Y,d)+" > "+i(T,d)+" but Min. Delta "+G.toFixed(2)+" < Exp. Delta "+i(ee,d),a.duration>15&&t(B,d)===t(a.rate,d)?(v.reason+=", temp "+a.rate+" ~ req "+B+"U/hr. ",v):(v.reason+="; setting current basal of "+B+" as temp. ",g.setTempBasal(B,30,d,v,a));if(Math.min(Y,Ce)<A&&(!b||!ie))return v.reason+=i(Y,d)+"-"+i(Ce,d)+" in range: no temp required",a.duration>15&&t(B,d)===t(a.rate,d)?(v.reason+=", temp "+a.rate+" ~ req "+B+"U/hr. ",v):(v.reason+="; setting current basal of "+B+" as temp. ",g.setTempBasal(B,30,d,v,a));if(Y>=A&&(v.reason+="Eventual BG "+i(Y,d)+" >= "+i(A,d)+", "),r.iob>R)return v.reason+="IOB "+o(r.iob,2)+" > max_iob "+R,a.duration>15&&t(B,d)===t(a.rate,d)?(v.reason+=", temp "+a.rate+" ~ req "+B+"U/hr. ",v):(v.reason+="; setting current basal of "+B+" as temp. ",g.setTempBasal(B,30,d,v,a));(na=o((Math.min(Ce,Y)-O)/Z,2))>R-r.iob&&(v.reason+="max_iob "+R+", ",na=R-r.iob),la=t(la=B+2*na,d),na=o(na,3),v.insulinReq=na;var da=o((new Date(M).getTime()-r.lastBolusTime)/6e4,1);if(b&&ie&&C>L){var ua=o(c.mealCOB/d.carb_ratio,3);if(d.use_autoisf)ca=d.smb_max_range_extension;else{console.error("autoISF disabled, SMB range extension disabled");var ca=1}if(ca>1&&console.error("SMB max range extended from default by factor "+ca),void 0===d.maxSMBBasalMinutes){var ga=o(ca*d.current_basal*30/60,1);console.error("profile.maxSMBBasalMinutes undefined: defaulting to 30m")}else r.iob>ua&&r.iob>0?(console.error("IOB",r.iob,"> COB",c.mealCOB+"; mealInsulinReq =",ua),d.maxUAMSMBBasalMinutes?(console.error("profile.maxUAMSMBBasalMinutes:",d.maxUAMSMBBasalMinutes,"profile.current_basal:",d.current_basal),ga=o(ca*d.current_basal*d.maxUAMSMBBasalMinutes/60,1)):(console.error("profile.maxUAMSMBBasalMinutes undefined: defaulting to 30m"),ga=o(30*d.current_basal/60,1))):(console.error("profile.maxSMBBasalMinutes:",d.maxSMBBasalMinutes,"profile.current_basal:",d.current_basal),ga=o(ca*d.current_basal*d.maxSMBBasalMinutes/60,1));var ba=d.bolus_increment,pa=1/ba;if(d.use_autoisf){var fa=function(e,a,r){if(void 0===e.smb_delivery_ratio_bg_range||0===e.smb_delivery_ratio_bg_range)return console.error("SMB delivery ratio set to fixed value "+e.smb_delivery_ratio),e.smb_delivery_ratio;var t=Math.min(e.smb_delivery_ratio_min,e.smb_delivery_ratio_max);if(a<=r)return console.error("SMB delivery ratio limited by minimum value "+t),t;var i=Math.max(e.smb_delivery_ratio_min,e.smb_delivery_ratio_max);if(a>=r+e.smb_delivery_ratio_bg_range)return console.error("SMB delivery ratio limited by maximum value "+i),i;var n=t+(i-t)*(a-r)/e.smb_delivery_ratio_bg_range;return console.error("SMB delivery ratio set to interpolated value "+o(n,2)),n}(d,C,O);s="SMB Delivery Ratio: "+o(fa,2)+", ",v.reason+=s}else console.error("autoISF disabled, don't adjust SMB Delivery Ratio"),fa=.5;fa>.5&&console.error("SMB Delivery Ratio increased from default 0.5 to "+o(fa,2));var va=Math.min(na*fa,ga);va=Math.floor(va*pa)/pa,ia=o(60*(oa=(O-(X+Oe)/2)/Z)/d.current_basal),na>0&&va<ba&&(ia=0);var ha=0;ia<=0?ia=0:ia>=30?(ia=30*o(ia/30),ia=Math.min(60,Math.max(0,ia))):(ha=o(B*ia/30,2),ia=30),v.reason+=" insulinReq "+na,va>=ga&&(v.reason+="; maxBolus "+ga),ia>0&&(v.reason+="; setting "+ia+"m low temp of "+ha+"U/h"),v.reason+=". ";var _a=3;d.SMBInterval&&(_a=Math.min(10,Math.max(1,d.SMBInterval)));var Ba=o(_a-da,0),Ma=o(60*(_a-da),0)%60;if(console.error("naive_eventualBG",X+",",ia+"m "+ha+"U/h temp needed; last bolus",da+"m ago; maxBolus: "+ga),da>_a?va>0&&(v.units=va,v.reason+="Microbolusing "+va+"U. "):v.reason+="Waiting "+Ba+"m "+Ma+"s to microbolus again. ",ia>0)return v.rate=ha,v.duration=ia,v}var xa=g.getMaxSafeBasal(d);return la>xa&&(v.reason+="adj. req. rate: "+la+" to maxSafeBasal: "+xa+", ",la=t(xa,d)),(ma=a.duration*(a.rate-B)/60)>=2*na?(v.reason+=a.duration+"m@"+a.rate.toFixed(2)+" > 2 * insulinReq. Setting temp basal of "+la+"U/hr. ",g.setTempBasal(la,30,d,v,a)):void 0===a.duration||0===a.duration?(v.reason+="no temp, setting "+la+"U/hr. ",g.setTempBasal(la,30,d,v,a)):a.duration>5&&t(la,d)<=t(a.rate,d)?(v.reason+="temp "+a.rate+" >~ req "+la+"U/hr. ",v):(v.reason+="temp "+a.rate+"<"+la+"U/hr. ",g.setTempBasal(la,30,d,v,a))}},6880:(e,a,r)=>{var t=r(6654);e.exports=function(e,a){var r=20;void 0!==a&&"string"==typeof a.model&&(t(a.model,"54")||t(a.model,"23"))&&(r=40);return e<1?Math.round(e*r)/r:e<10?Math.round(20*e)/20:Math.round(10*e)/10}},2705:(e,a,r)=>{var t=r(5639).Symbol;e.exports=t},9932:e=>{e.exports=function(e,a){for(var r=-1,t=null==e?0:e.length,o=Array(t);++r<t;)o[r]=a(e[r],r,e);return o}},9750:e=>{e.exports=function(e,a,r){return e==e&&(void 0!==r&&(e=e<=r?e:r),void 0!==a&&(e=e>=a?e:a)),e}},4239:(e,a,r)=>{var t=r(2705),o=r(9607),i=r(2333),n=t?t.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":n&&n in Object(e)?o(e):i(e)}},531:(e,a,r)=>{var t=r(2705),o=r(9932),i=r(1469),n=r(3448),s=t?t.prototype:void 0,l=s?s.toString:void 0;e.exports=function e(a){if("string"==typeof a)return a;if(i(a))return o(a,e)+"";if(n(a))return l?l.call(a):"";var r=a+"";return"0"==r&&1/a==-Infinity?"-0":r}},7561:(e,a,r)=>{var t=r(7990),o=/^\s+/;e.exports=function(e){return e?e.slice(0,t(e)+1).replace(o,""):e}},1957:(e,a,r)=>{var t="object"==typeof r.g&&r.g&&r.g.Object===Object&&r.g;e.exports=t},9607:(e,a,r)=>{var t=r(2705),o=Object.prototype,i=o.hasOwnProperty,n=o.toString,s=t?t.toStringTag:void 0;e.exports=function(e){var a=i.call(e,s),r=e[s];try{e[s]=void 0;var t=!0}catch(e){}var o=n.call(e);return t&&(a?e[s]=r:delete e[s]),o}},2333:e=>{var a=Object.prototype.toString;e.exports=function(e){return a.call(e)}},5639:(e,a,r)=>{var t=r(1957),o="object"==typeof self&&self&&self.Object===Object&&self,i=t||o||Function("return this")();e.exports=i},7990:e=>{var a=/\s/;e.exports=function(e){for(var r=e.length;r--&&a.test(e.charAt(r)););return r}},6654:(e,a,r)=>{var t=r(9750),o=r(531),i=r(554),n=r(9833);e.exports=function(e,a,r){e=n(e),a=o(a);var s=e.length,l=r=void 0===r?s:t(i(r),0,s);return(r-=a.length)>=0&&e.slice(r,l)==a}},1469:e=>{var a=Array.isArray;e.exports=a},3218:e=>{e.exports=function(e){var a=typeof e;return null!=e&&("object"==a||"function"==a)}},7005:e=>{e.exports=function(e){return null!=e&&"object"==typeof e}},3448:(e,a,r)=>{var t=r(4239),o=r(7005);e.exports=function(e){return"symbol"==typeof e||o(e)&&"[object Symbol]"==t(e)}},8601:(e,a,r)=>{var t=r(4841),o=1/0;e.exports=function(e){return e?(e=t(e))===o||e===-1/0?17976931348623157e292*(e<0?-1:1):e==e?e:0:0===e?e:0}},554:(e,a,r)=>{var t=r(8601);e.exports=function(e){var a=t(e),r=a%1;return a==a?r?a-r:a:0}},4841:(e,a,r)=>{var t=r(7561),o=r(3218),i=r(3448),n=/^[-+]0x[0-9a-f]+$/i,s=/^0b[01]+$/i,l=/^0o[0-7]+$/i,m=parseInt;e.exports=function(e){if("number"==typeof e)return e;if(i(e))return NaN;if(o(e)){var a="function"==typeof e.valueOf?e.valueOf():e;e=o(a)?a+"":a}if("string"!=typeof e)return 0===e?e:+e;e=t(e);var r=s.test(e);return r||l.test(e)?m(e.slice(2),r?2:8):n.test(e)?NaN:+e}},9833:(e,a,r)=>{var t=r(531);e.exports=function(e){return null==e?"":t(e)}}},a={};function r(t){var o=a[t];if(void 0!==o)return o.exports;var i=a[t]={exports:{}};return e[t](i,i.exports,r),i.exports}r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}();var t=r(5546);freeaps_determineBasal=t})();