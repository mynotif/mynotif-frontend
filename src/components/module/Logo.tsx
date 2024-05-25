import React from 'react'

interface LogoProps {
  size?: string | number
}

export const Logo: React.FC<LogoProps> = ({ size = 100 }) => {
  return (
    <div style={{ width: size, height: size }}>
      <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' viewBox='0 0 131.41 124.79'>
        <defs>
          <style>{`
            .cls-1{fill:url(#Dégradé_sans_nom_42);}
            .cls-1, .cls-2, .cls-3, .cls-4, .cls-5{stroke-width:0px;}
            .cls-6{isolation:isolate;}
            .cls-7{opacity:.29;}
            .cls-2{fill:url(#Dégradé_sans_nom_23);}
            .cls-3{fill:url(#Dégradé_sans_nom_107);}
            .cls-4{fill:url(#Dégradé_sans_nom_78);mix-blend-mode:darken;opacity:.46;}
            .cls-5{fill:url(#Dégradé_sans_nom_42-2);}
          `}
          </style>
          <linearGradient id='Dégradé_sans_nom_107' x1='63.57' y1='0' x2='63.57' y2='91.24' gradientUnits='userSpaceOnUse'>
            <stop offset='0' stopColor='#dedede' />
            <stop offset='.31' stopColor='#dbdbdb' />
            <stop offset='.49' stopColor='#d3d3d3' />
            <stop offset='.62' stopColor='#c5c5c5' />
            <stop offset='.74' stopColor='#b2b2b2' />
            <stop offset='.85' stopColor='#999' />
            <stop offset='.95' stopColor='#7a7a7a' />
            <stop offset='1' stopColor='#676767' />
          </linearGradient>
          <linearGradient id='Dégradé_sans_nom_78' x1='77.84' y1='21.39' x2='45.39' y2='111.26' gradientUnits='userSpaceOnUse'>
            <stop offset='0' stopColor='#d1d1d1' />
            <stop offset='.02' stopColor='#c5c5c5' />
            <stop offset='.1' stopColor='#aaa' />
            <stop offset='.18' stopColor='#949494' />
            <stop offset='.26' stopColor='#858585' />
            <stop offset='.37' stopColor='#7c7c7c' />
            <stop offset='.52' stopColor='#7a7a7a' />
            <stop offset='.66' stopColor='#484848' />
            <stop offset='.8' stopColor='#202020' />
            <stop offset='.91' stopColor='#080808' />
            <stop offset='.98' stopColor='#000' />
          </linearGradient>
          <linearGradient id='Dégradé_sans_nom_42' x1='79.44' y1='25.82' x2='53.6' y2='97.37' gradientUnits='userSpaceOnUse'>
            <stop offset='0' stopColor='#f2f2f2' />
            <stop offset='.2' stopColor='#e7e7e7' />
            <stop offset='.68' stopColor='#d4d4d4' />
            <stop offset='1' stopColor='#cdcdcd' />
          </linearGradient>
          <linearGradient id='Dégradé_sans_nom_42-2' x1='80.5' y1='29.82' x2='55.89' y2='97.97' xlinkHref='#Dégradé_sans_nom_42' />
          <linearGradient id='Dégradé_sans_nom_23' x1='70.25' y1='53.96' x2='70.25' y2='103.48' gradientUnits='userSpaceOnUse'>
            <stop offset='0' stopColor='#cbcbcb' />
            <stop offset='.38' stopColor='#c8c8c8' />
            <stop offset='.58' stopColor='silver' />
            <stop offset='.75' stopColor='#b3b3b3' />
          </linearGradient>
        </defs>
        <g className='cls-6'>
          <g id='Calque_1'>
            <path className='cls-3' d='M127.14,43.46v40.22c0,2.63-2.1,4.77-4.73,4.84l-28.3.65-58.38,1.34-31.56.73c-2.29.05-4.17-1.79-4.17-4.08v-43.79c0-2.69,2.19-4.86,4.87-4.84l30.8.22v-.03s.17-13.86.17-13.86l.23-20C36.1,2.12,38.37-.06,41.1,0l48,1.12c2.8.07,5.04,2.38,5,5.18l-.41,32.86,29.39.21c2.24.01,4.05,1.84,4.05,4.08Z' />
            <path className='cls-4' d='M94.11,89.17h-.2s-57.66,1.33-57.66,1.33l-1.29.03.87-65.66,16.03.31c1.65.03,3.11,1.08,3.65,2.63l2.89,8.1c.55,1.55,2,2.59,3.65,2.63l27.84.56c2.11.04,3.81,1.76,3.83,3.87l.08,9.32.3,36.24v.65Z' />
            <polygon className='cls-1' points='35.31 90.52 39.82 44.28 96.42 44.28 89.5 89.21 35.31 90.52' />
            <g className='cls-7'>
              <image width='273' height='234' transform='translate(.37 12.47) scale(.48)' xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARAAAADqCAYAAABqdBreAAAACXBIWXMAABcRAAAXEQHKJvM/AAAgAElEQVR4nO2dzXIjR3qu3y+zfkAQZKtbITOsiFbMbCRvtNZurkAbXYCuzhfgjeNszup4N9szG0vhCNuj8Pj0jKWe7iZBoKoy37PIn8oqFEi21C1piO+RKgAUQLC6iHrx/SegKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKIqiKMppIb/0AZwSJEVET/mvFP7SB/C3iH6a3x96bv/2UVG5B/NLH8BjgqQgCMeieHz91Zfl87r9Srb4d1ni6N9SCejJeTfc9QGc8MXnv5Pf/+Ff3vPhKA/li89/h9//4V+WLI2H7jtp1AL5CRQWR8ncCpl8273864vFb8HnH31sEP4eur2HLZ7fg/MexXy+P++bWSdqkczQk/HjWRKOO+8//+hj+e4vfwIAPL36RF6++OPkDS4/vBIAeP39i3d6oKfK5YdXAIDX37+4z5rI9z99/hm+/e4bAsAXn/8Dfv+Hf1183ZHHJ4cKyI/jXrHA9Jss315+eCVJIDZPnsr1q5f5B843zwQAbq5/eMeHe5qcX1wArHFz/cPkQt88eYrrVy/TPgLA07//O7z87z9P9mFZZFRECqpf+gD+BrlXJJZuk1i8/v5F3nf96iXazYXsr98AAJzvVdDfIc4BQA/MhOD61Uus15fYbl/zfPMMN9c/sN/m1xHh78ar3/5GXvz7f0z2YfybpvcUnLCI6Af27bhPPKR' />
            </g>
            <polygon className='cls-5' points='35.85 90.5 43.28 48.56 99.88 48.56 89.5 89.21 35.85 90.5' />
            <path className='cls-2' d='M104.17,54.38l-10.06,34.14-.19.65-57.66,1.32,10.12-35.55c.3-1.04,1.24-1.76,2.32-1.79l45.12-.88,8.64-.17c1.2-.02,2.07,1.12,1.73,2.27Z' />
          </g>
        </g>
      </svg>
    </div>
  )
}
