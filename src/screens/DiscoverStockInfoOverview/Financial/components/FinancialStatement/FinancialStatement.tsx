import React, { memo, useMemo } from 'react';
import { View, Text } from 'react-native';
import { formatNumber } from 'utils';
import globalStyles from 'styles';
import { RowComponentProps } from 'components/SheetData3';
import { useTranslation } from 'react-i18next';
import { IFinancialStatementRow } from '../../constants';
import Animated from 'react-native-reanimated';
import { useStyles } from './styles';

const FinancialStatement = ({ data, frozenStyle }: RowComponentProps<IFinancialStatementRow>) => {
  const { styles } = useStyles();
  const { t } = useTranslation();

  const frozenColumnStyle = useMemo(() => [styles.tableContainer, frozenStyle], [styles, frozenStyle]);

  const frozenHeaderColumnStyle = useMemo(() => [styles.tableHeaderFrozen, frozenStyle], [styles, frozenStyle]);

  if (data.name === 'Name') {
    return (
      <View style={globalStyles.flexDirectionRow}>
        <Animated.View style={frozenHeaderColumnStyle}>
          <Text style={styles.titleHeaderText}>{t(data.name)}</Text>
        </Animated.View>
        <View style={globalStyles.flexDirectionRow}>
          {data.value != null ? (
            data.value.map((ele, index) => (
              <View style={styles.tableHeader} key={`FinancialStatement_FinancialStatementItem_${index}`}>
                <Text style={styles.titleHeaderText}>{ele != null ? ele : '-'}</Text>
              </View>
            ))
          ) : (
            <Text>-</Text>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={globalStyles.flexDirectionRow}>
      <Animated.View style={frozenColumnStyle}>
        <Text style={styles.textValueTable}>{t(data.name)}</Text>
      </Animated.View>
      <View style={globalStyles.flexDirectionRow}>
        {data.value != null ? (
          data.value.map((ele, index) => (
            <View style={styles.tableView} key={`FinancialStatement_FinancialStatementItem_${index}`}>
              <Text style={styles.textValueTable1}>
                {ele != null ? formatNumber(Number(ele) / 1000000000, 2, undefined, true) : '-'}
              </Text>
            </View>
          ))
        ) : (
          <Text>-</Text>
        )}
      </View>
    </View>
  );
};

export default memo(FinancialStatement);
