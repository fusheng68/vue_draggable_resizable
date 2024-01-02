//国际化多语言切换
import { useI18n } from 'vue-i18n'
const { locale, t } = useI18n();


const standards = {
    text1:{
        top: 0,
        left: 0,
        size: 60,
        color: '#000',
        width: 200,
        height: 100,
        font_weight: 'bold',
        value:t('title1'),
        lable:t('title1'),
        type:'text'
    },
    text2:{
        top: 0,
        left: 0,
        size: 40,
        color: '#000',
        width: 150,
        height:70,
        font_weight: 'bold',
        value:t('title2'),
        lable:t('title2'),
        type:'text'
    },
    text3:{
        top: 0,
        left: 0,
        size: 30,
        color: '#000',
        width: 120,
        height: 50,
        font_weight: '500',
        value:t('title3'),
        lable:t('title3'),
        type:'text'
    },
    text4:{
        top: 0,
        left: 0,
        size: 16,
        color: '#000',
        width: 100,
        height: 30,
        font_weight: '500',
        value:t('title4'),
        lable:t('title4'),
        type:'text'
    },
    shape1:{
        top: 0,
        left: 0,
        background_color: '#000',
        width: 100,
        height:100,
        border_width: 0,
        border_style:'solid',
        border_color: null,
        font_weight: '',
        value:'',
        radius: 0,
        lable:t('solidRectangle'),
        type:'rect'
    },
    shape2:{
        top: 0,
        left: 0,
        background_color: '#000',
        width: 100,
        height:100,
        border_width: 0,
        border_style:'solid',
        border_color: null,
        radius: 50,
        font_weight: '',
        value:'',
        lable:t('solidCircle'),
        type:'rect'
    },
    shape3:{
        top: 0,
        left: 0,
        background_color: null,
        border_width:5,
        border_style:'solid',
        border_color:'#000',
        width: 100,
        height:100,
        font_weight: '',
        value:'',
        radius: 0,
        lable:t('hollowCircle'),
        type:'rect'
    },
    shape4:{
        top: 0,
        left: 0,
        background_color: null,
        border_width:5,
        border_style:'solid',
        border_color:'#000',
        width: 100,
        height:100,
        radius: 50,
        font_weight: '',
        value:'',
        lable:t('hollowCircle'),
        type:'rect'
    }
}
export default standards