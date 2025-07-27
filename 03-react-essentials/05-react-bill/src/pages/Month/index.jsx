import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import {useEffect, useMemo, useState} from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import {useDispatch, useSelector} from "react-redux";
import _ from 'lodash'
import { getBillList } from '@/store/modules/billStore'

const Month = () => {
    // 获取账单数据
    const billList = useSelector(state => state.bill.billList)

    const dispatch = useDispatch();
    useEffect(() => {
        // 只有在这里，在组件渲染完成后，才能安全地触发副作用
        dispatch(getBillList()); // <-- 派发异步 Action，启动数据加载
    }, [dispatch]); // 依赖 dispatch 确保 Hook 规则

    const monthGroup = useMemo(() => {
        // return 计算之后的值
        return _.groupBy(billList, (item)=>dayjs(item.date).format('YYYY-MM'))
    }, [billList])


    // 控制弹框的打开和关闭
    const [dateVisible, setDateVisible] = useState(false)

    // 控制时间显示
    const [currentDate, setCurrentDate] = useState(() => {
        return (dayjs(new Date()).format('YYYY-MM'))
    })

    const [currentMonthList, setCurrentMonthList] = useState([])
    console.log(currentMonthList)
    useMemo(() => {
        // 支出 / 收入 / 结余
        const pay = currentMonthList.filter(item=>item.type === 'pay').reduce((acc, cur) =>
           acc + cur.money, 0)
        const income = currentMonthList.filter(item=>item.type === 'income').reduce((acc, cur) =>
           acc + cur.money, 0)
        return {
            pay,
            income,
            total: pay + income,
        }

    }, [currentMonthList])

    // 确认回调
    const onConfirm = (date) => {
        // 点击确定关闭时间选择器
        setDateVisible(false)
        // 更新时间显示
        const formatDate = dayjs(date).format('YYYY-MM')
        setCurrentDate(formatDate)
        setCurrentMonthList(monthGroup[formatDate])
    }

    return (
        <div className="monthlyBill">
            <NavBar className="nav" backArrow={false}>
                月度收支
            </NavBar>
            <div className="content">
                <div className="header">
                    {/* 时间切换区域 */}
                    <div className="date" onClick={() => setDateVisible(true)}>
                        <span className="text">
                          {currentDate + ''}月账单
                        </span>
                        <span className={classNames('arrow', dateVisible && 'expand')}></span>
                    </div>
                    {/* 统计区域 */}
                    <div className='twoLineOverview'>
                        <div className="item">
                            <span className="money">{100}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{200}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{200}</span>
                            <span className="type">结余</span>
                        </div>
                    </div>
                    {/* 时间选择器 */}
                    <DatePicker
                        className="kaDate"
                        title="记账日期"
                        precision="month"
                        visible={dateVisible}
                        onCancel={() => {setDateVisible(false)}}
                        onConfirm={onConfirm}
                        onClose={() => {setDateVisible(false)}}
                        max={new Date()}
                    />
                </div>
            </div>
        </div >
    )
}

export default Month