import {
  BOLD_FONT_SMALL, REGULAR_FONT_SMALL,
  BOLD_FONT_MEDIUM, REGULAR_FONT_MEDIUM, MAIN_COLOR
} from '../utls/layout'

export default {
  container: {
    flex: 1
  },
  navItemStyle: {
    paddingEnd: 24,
    textAlign: 'right',
    ...BOLD_FONT_SMALL
  },
  scrollStyle: {
    flex: 1,
    fleDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  navSectionStyle: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    paddingRight: 16,
    marginBottom: 20,
  },
  sectionHeadingStyle: {
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  footerContainer: {
    padding: 20,
    backgroundColor: 'lightgrey'
  },
  HeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 160,
    alignItems: 'center',
    backgroundColor: MAIN_COLOR,
  },
  HeaderTextMain: {
    paddingEnd: 2,
    paddingStart: 2,
    textAlign: 'right',
    color: 'white',
    ...BOLD_FONT_MEDIUM
  },
  HeaderTextSecond: {
    paddingEnd: 2,
    paddingStart: 2,
    textAlign: 'right',
    color: 'white',
    ...BOLD_FONT_SMALL
  },
  profileImg: {
    height: 60,
    width: 60,
    borderRadius: 25,
  },
  HeaderTextBackground:{
    flex: 4,
    flexDirection: 'column',
    height: 100,
    marginStart: 5,
    marginEnd: 5,
    flexGrow: 1,
    alignContent: 'center',
    justifyContent: 'center'
  }
};